'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var Agend = require('../models/agend');

function saveAgend(req, res){
    var agend = new Agend();
    var params = req.body;

    agend.name = params.name;
    agend.description = params.description;
    agend.detail = params.detail;
    agend.date = params.date;
    agend,datecreat = Date.now();

    agend.save((err, agendStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agendStored){
                res.status(404).send({message:'Error al guardar Agenda'});
            }else{
                res.status(200).send({agend:agendStored});
                console.log(agendStored)
            }
        }
    });

}

module.exports ={
    saveAgend
}