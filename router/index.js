/**
 * The Index of Routes
 */

module.exports = function (app) {

	app.use('/dbpedia', require('./routes/dbpedia'));
	app.use('/point', require('./routes/point'));
    
}
