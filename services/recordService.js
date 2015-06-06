var db = require('../database');
var Points = db.points;


function lastPoint(callback) {
	Points.findOne({

	}, {}, {sort:{$natural:-1}}, function(err, resource) {

		if (err) {
			console.log(err);
			callback(err);
		}
		if (resource) {
			console.log(resource);
			callback(null,resource);
		}
		if (!resource) {
			callback(err);
		}
	});
}

function recordPoint(point, callback) {

	var timestampDate = new Date(point.timestamp);

	var point = new Points({
		longitude: point.longitude,
		latitude: point.latitude,
		accuracy: point.accuracy,
		altitude: point.altitude,
		altitudeAccuracy: point.altitudeAccuracy,
		timestamp: timestampDate,
		heading: point.heading,
		speed: point.speed
	});

	//console.log(newResource);


	point.save(function(err, savedResource, numberAffected) {
		console.log(err);
		callback(savedResource);
	});

}

module.exports = {
	recordPoint: recordPoint,
	lastPoint: lastPoint
}