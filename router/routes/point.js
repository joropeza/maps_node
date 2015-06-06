var express = require('express');
var passport = require('passport');
var router = express.Router();

var recordService = require('../../services/recordService');
var Q = require('q');

router.get('/', function(req, res) {
	Q.nfcall(recordService.lastPoint).then(function(results) {
		res.send(results);
	});
});

router.post('/', function(req, res) {
	var point = req.body.point;
	console.log(point);
	res.send('done');
	Q.nfcall(recordService.recordPoint, point).then(function(results) {
		res.send(results);
	});
});

module.exports = router;