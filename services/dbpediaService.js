//var moment = require('moment');
//var _ = require('underscore');
//var color = require('cli-color');

var SparqlClient = require('sparql-client');
var util = require('util');
var endpoint = 'http://dbpedia.org/sparql';
var Q = require('q');

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

function qDbPedia(query, callback) {

	var client = new SparqlClient(endpoint);
	console.log("Query to " + endpoint);
	console.log("Query: " + query);
	client.query(query)
		.execute(function(error, results) {

			try {
				console.log(results.results.bindings);
				callback(null,results.results.bindings);
			} catch (err) {
				console.log('error!');
				callback(err);
			}
		});
}


function cleanEncode(queryString) {

	queryString = queryString.replace('ø','o');

	return queryString;

}


function nearbyPlaces(location, radius, callback) {
	//location.lat, locationg.long
	
	var topLat 		= Number(location.lat) + Number(radius),
		bottomLat 	= Number(location.lat) - Number(radius),
		leftLong	= Number(location.long) - Number(radius),
		rightLong 	= Number(location.long) + Number(radius);

	var query = '' +
	'PREFIX g: <http://www.w3.org/2003/01/geo/wgs84_pos#> ' +
	'PREFIX onto: <http://dbpedia.org/ontology/> ' +
	'SELECT * WHERE { ' +
    '?subject g:lat ?lat . ' + 
    '?subject g:long ?long . ' + 
    '?subject rdfs:label ?label . ' + 
    'FILTER(?lat >= ' + bottomLat + ' && ?lat <= ' + topLat + ' && ' + 
    '?long >= ' + leftLong + ' && ?long <= ' + rightLong + ' ' + 
    '). ' + 
	'} LIMIT 5 ';

	Q.nfcall(qDbPedia,query).then(function(dbpediaEntries) {

		if (dbpediaEntries === null) {
			callback(null,null);
		}

		callback(null,dbpediaEntries);

	});

}

module.exports = {
	nearbyPlaces: nearbyPlaces
}