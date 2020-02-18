'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = Schema({

	name: String,
    link: String,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String	
});

module.exports = mongoose.model('Video',VideoSchema);