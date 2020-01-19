'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgendSchema = Schema({

	name: String,
	description: String,
	detail: String,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String	
});

module.exports = mongoose.model('Agend',AgendSchema);