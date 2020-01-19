'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AudiSchema = Schema({

	name: String,
    link: String,
    issolext: Boolean,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String	
});

module.exports = mongoose.model('Audi',AudiSchema);