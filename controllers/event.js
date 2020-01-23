'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
// var auth = require('../middlewares/authenticated');
var Event = require('../models/event');

function newEvent(req, res){
    var event = new Event();
    var params = req.body;
    var user = auth.ensureAuth(req.headers.authorization);

    event.name = params.name;
    event.link = params.link;
    event.image = 'null'
    event.datecreat = Date.now();
    event.dataedit = null;
    // event.datedel = null;
    // event.personcreat = user.firstname;
    // event.personedit = null;
    // event.persondel = null;

    event.save((err, eventStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!eventStored){
                res.status(404).send({message:'Error en guardar Evento'});
            }else{
                res.status(200).send({event:eventStored});
            }
        }
    });
}

module.exports = {
    newEvent
}