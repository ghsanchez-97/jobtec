'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
// var auth = require('../middlewares/authenticated');
var Event = require('../models/event');

function newEvent(req, res){
    var event = new Event();
    var params = req.body;
    //var user = auth.ensureAuth(req.headers.authorization);

    event.name = params.name;
    event.link = params.link;
    event.image = 'null'
    event.datecreat = Date.now();
    event.dataedit = null;
    event.datedel = null;
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
function getEvent(req, res){
    var enventId = req.params.id;
    
    Event.findById(enventId, (err, event)=>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!event){
                res.status(404).send({message:'Evento no existe'});
            }else{
                res.status(200).send({event:event});
            }
        }
    });
}

function getEventPubli(req, res){
    var eventNm = req.params.id;

    Event.findById(eventNm, (err, event)=>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!event){
                res.status(404).send({message:'No existe el Evento'});
            }else{
                res.status(200).send({event:event});
                console.log(event);
                console.log(eventNm);
            }
        }
    });
}

module.exports = {
    newEvent,
    getEvent,
    getEventPubli
}