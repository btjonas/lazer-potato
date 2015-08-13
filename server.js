// Resonse used when bad request is made to server
var beaconBadRequest = { beaconidfound: false };

// Installed beacons and the equipment they 'monitor'. Minor values used
var beacon1337 = { beaconidfound: true, equipment: 
	[{ name: 'Garbage Can' , status: 'fully cunctional' , service: 'no not needed' },
	{ name: 'Garage Door Opener' , status: 'operational' , service: '2 months until service' }] };

var beacon1000 = { beaconidfound: true, equipment: 
	[{ name: 'Garbage Can' , status: 'fully cunctional' , service: 'no not needed' },
	{ name: 'Garage Door Opener' , status: 'operational' , service: '2 months until service' }] };	


var express = require('express');
var app = express();

// Use this /beaconid to request beaconinformation
// Request like this localhost:8080/beaconid?id=1337
// Unvalid requests will return string 
app.get('/beaconid', function (req, res) {
  console.log('INFO - beacon id requested with minor: ' + req.query.id);
  var requestedID = "beacon" + req.query.id

  try {
    res.json(eval(requestedID));
    console.log("OK - Request for beacon id: " + req.query.id + " has been processed"); 
  } catch (e) {
    res.json(beaconBadRequest);
    console.log("BAD - ReferenceError: " + req.query.id + " is not defined"); 
  }		
});

// Depricated, a really silly way of using GET witouth using query string data
app.get('/beaconid/42', function (req, res) {
  res.json(id42);
});

// Depricated experiment function only
app.all('/secret', function (req, res, next) {
  console.log(req);
  res.send('Hey this is secret, see node.js console log');
  next(); // pass control to the next handler
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Beacon service provider listening at http://%s:%s', host, port);
});