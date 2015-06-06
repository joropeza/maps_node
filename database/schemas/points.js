var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var pointSchema = new Schema({
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
    accuracy: { type: Number, required: true },
    altitude: { type: Number, required: false },
	altitudeAccuracy: { type: Number, required: false },
	heading: {type: Number, required: false},
	speed: {type: Number, required: false},
	timestamp: { type: Date, default: Date.now}
});

var Point = mongoose.model('Point', pointSchema);

module.exports = Point;