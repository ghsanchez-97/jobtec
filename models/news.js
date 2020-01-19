'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = Schema({

	name: String,
	detail: String,
	link: String,
	image: String,
	islinot: Boolean,
	ispriseg: Boolean,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String	
});

module.exports = mongoose.model('News',NewsSchema);