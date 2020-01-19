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
	image: String,
	fechaagregada: Date,
    fechamodificado:Date,
	fechaeliminado: Date,
	personagregada: String,
    personmodificado: String,
    personeliminado: String,
	
});

module.exports = mongoose.model('User',UserSchema);