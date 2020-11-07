'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgentSchema = Schema({

	name: String,
	categoria: String,
	decription:String,
	area: String,
	horario: String,
	time_init: String,
	time_end: String,
	salario: Number,
	lugar: String,
	datecreat: Date,
	dataedit: Date,
	datedel: Date,
	personcreat: String,
	personedit: String,
	persondel: String	
});

module.exports = mongoose.model('Agent',AgentSchema);