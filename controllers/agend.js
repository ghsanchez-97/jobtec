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
    agend.datecreat = Date.now();

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
function getAgend(req, res){
    var agendId = req.params.id;

    Agend.findById(agendId, (err, agend) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no exite Agenda'});
            }else{
                res.status(200).send({agend});
            }
        }
    });
}
function getAgendPublic(req, res){
    var agendId = req.params.name;

    Agend.findOne({name:agendId}, (err, agend) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no exite Agenda'});
            }else{
                res.status(200).send({agend});
            }
        }
    });
}
function getsAgends(req, res){
    var page = req.params.page;
    var itemPerPage = 3;

    Agend.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerPage, function(err, agend, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no hay Agendas'});
            }else{
                return res.status(200).send({
                    total:total,
                    agend:agend,
                });
            }
        }
    });
}
function getsAgendsPublic(req, res){
    var page = req.params.page;
    var itemPerPage = 3;

    Agend.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerPage, function(err, agend, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no hay Agendas'});
            }else{
                return res.status(200).send({
                    total:total,
                    agend:agend,
                });
            }
        }
    });
}
function updateAgend(req, res){
    var agendId = req.params.id;
    var update = req.body;
    update.dataedit = Date.now();

    Agend.findByIdAndUpdate(agendId, update, (err, agendUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agendUpdate){
                res.status(404).send({message:'Error no se actualizo Agenda'});
            }else{
                res.status(200).send({agendUpdate:agendUpdate});
            }
        }
    });
}

module.exports = {
    saveAgend,
    getAgend,
    getAgendPublic,
    getsAgends,
    getsAgendsPublic,
    updateAgend
}