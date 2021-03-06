// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  
  const dStr = req.params.date_string || '';
  const iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
console.log(dStr)
  if(iso8601.test(dStr)){
    const d1 = new Date(dStr);
    console.log('iso8601', d1)
    res.json({ "unix": d1.getTime(), "utc": d1.toUTCString()});
  } else if(dStr === ''){
    const d2 = new Date();
    console.log('empty', d2)
    res.json({ "unix": d2.getTime(), "utc": d2.toUTCString()});
  } else if(Number.isInteger(Number(dStr))) {
    const d3 = new Date(Number(dStr));
    console.log('timestamp', d3)
    res.json({ "unix": d3.getTime(), "utc": d3.toUTCString()});
  }
  else {
    console.log('invalid')
    res.json({ "error" : "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
