'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({

	firstname: String,
	middlename: String,
	firstlastname: String,
	middlelastname: String,	
	email: String,
	password: String,
	rol: String,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String
	
});

module.exports = mongoose.model('User',UserSchema);