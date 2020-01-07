'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = Schema({

	name: String,
	link: String,
	image: String,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String	
});

module.exports = mongoose.model('Event',EventSchema);