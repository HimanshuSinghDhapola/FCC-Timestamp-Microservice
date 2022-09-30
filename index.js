// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let data = {}
app.get("/api/:timestamp", (req, res) => {
  let timestamp = req.params.timestamp;
  if(!isNaN(Number(timestamp)) && timestamp.length === 13){
    return res.send({
      unix: parseInt(timestamp),
      utc: new Date(Number(timestamp)).toUTCString()
    });
  } else if(new Date(timestamp).toUTCString() !== 'Invalid Date'){
    let date = new Date(timestamp);
    return res.send({
      unix: date.valueOf(),
      utc: date.toUTCString()
    });
  }else{
    res.send({
      error : "Invalid Date"
    })
  }
})

app.get("/api", (req, res) => {
  let date = new Date();
  res.send({
    unix: date.valueOf(),
    utc: date.toUTCString()
  })
})