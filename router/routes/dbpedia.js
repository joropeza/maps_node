var express = require('express');
var passport = require('passport');
var router = express.Router();

var dbpediaService = require('../../services/dbpediaService');
var Q = require('q');

router.get('/', function(req, res) {
		var location = {};
		location.lat 	= req.query.lat;
		location.long 	= req.query.long;
		var radius 		= req.query.radius;
		console.log(location);
		Q.nfcall(dbpediaService.nearbyPlaces,location,radius).then(function(places) {
			res.send(places);
		});
});

module.exports = router;