var express = require('express');
var passport = require('passport');
var router = express.Router();

var dbpediaService = require('../../services/recordService');
var Q = require('q');

router.post('/', function(req, res) {
		var point = req.body.point;
		console.log(point);
		res.send('done');
});

module.exports = router;