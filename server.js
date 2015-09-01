// Resonse sent from Heroku server when a bad request is made (i.e., unknown minor number is used)
var beaconBadRequest = { beaconidfound: false };

// Avaliable beacons and the equipment they are aware of, minor numbers are used to request equipment for a specific beacon
var beacon3823 = { beaconidfound: true, beaconname: "Jonas1", equipment: 
	[{ name: 'Garbage Can' , status: 'fully functional' , service: 'no not needed', picture: 'placeholder', functionality: 
    [{faceplate: true, servicehistory: true, pid: true, processgraphics: true }] },
	{ name: 'Garage Door Opener' , status: 'operational' , service: '2 months until service', picture: 'placeholder', functionality:
    [{faceplate: true, servicehistory: true, pid: true, processgraphics: true }] }] };

var beacon56235 = { beaconidfound: true, beaconname: "Jonas2", equipment: 
	[{ name: 'Garbage Can' , status: 'fully functional' , service: 'no not needed', picture: 'placeholder' },
	{ name: 'Garage Door Opener' , status: 'operational' , service: '2 months until service', picture: 'placeholder' }] };

var beacon7754 = { beaconidfound: true, beaconname: "Jonas3", equipment: 
  [{ name: 'Output Valve' , status: 'Open' , service: 'no not needed', picture: 'valve' },
  { name: 'Input Valve' , status: 'Open' , service: 'no not needed', picture: 'valve' },
  { name: 'Asynchronous motor' , status: 'Inactive - 0 RPM' , service: '2 months until service', picture: 'async_motor' }] }; 

var beacon30303 = { beaconidfound: true, beaconname: "Jonas4", equipment: 
  [{ name: 'Asynchronous motor' , status: '4500 RPM' , service: 'no not needed', picture: 'async_motor' },
  { name: 'Bipolar motor' , status: 'Inactive - 0 RPM' , service: '2 months until service', picture: 'bipolar_motor' }] };   

var functionality3823 = { beaconidfound: true, functionality: 
  [{faceplate: true, servicehistory: true, pid: true, processgraphics: true }, 
  {faceplate: true, servicehistory: true, pid: true, processgraphics: true }] }

var functionality56235 = { beaconidfound: true, functionality: 
  [{faceplate: true, servicehistory: true, pid: true, processgraphics: true }, 
  {faceplate: true, servicehistory: true, pid: true, processgraphics: true }] }

var functionality7754 = { beaconidfound: true, functionality: 
  [{faceplate: true, servicehistory: true, pid: true, processgraphics: true }, 
  {faceplate: true, servicehistory: true, pid: true, processgraphics: true }] }  

var functionality30303 = { beaconidfound: true, functionality: 
  [{faceplate: true, servicehistory: true, pid: true, processgraphics: true }, 
  {faceplate: true, servicehistory: true, pid: true, processgraphics: true }] }

var express = require('express');
var app = express();

// Use this /beaconid to request beaconinformation
// Request like this localhost:8080/beaconid?id=1337
// Unvalid requests will return string 
app.get('/beaconid', function (req, res) {
  console.log('INFO - beacon id requested with minor: ' + req.query.id);
  var requestedID = "beacon" + req.query.id;

  try {
    res.json(eval(requestedID));
    console.log("OK - Request for beacon id: " + req.query.id + " has been processed"); 
  } catch (e) {
    res.json(beaconBadRequest);
    console.log("BAD - ReferenceError: " + req.query.id + " is not defined"); 
  }		
});

app.get('/functionalityid', function (req, res) {
  console.log('INFO - functionality id requested with minor: ' + req.query.id);
  var requestedFunctionality = "functionality" + req.query.id;

  try {
    res.json(eval(requestedFunctionality));
    console.log("OK - Request for beacon functionality: " + req.query.id + " has been processed"); 
  } catch (e) {
    res.json(beaconBadRequest)
    console.log("BAD - ReferenceError: " + req.query.id + " is not defined"); 
  }
});

// Depricated, a really silly way of using GET witouth using query string data
/*
app.get('/beaconid/42', function (req, res) {
  res.json(id42);
});
*/

// Depricated experiment function only
/*
app.all('/secret', function (req, res, next) {
  console.log(req);
  res.send('Hey this is secret, see node.js console log');
  next(); // pass control to the next handler
});
*/

// BOOT - this was used when testing locally 
/*
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;  // this was used to run server locally
  console.log('Beacon service provider listening at http://%s:%s', host, port);
});
*/

// BOOT - this is used when running on heroku
var port = process.env.PORT || CONFIG.port; 
app.listen(port);
