'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var Audi = require('../models/Audi');
var auth = require('../middlewares/authenticated');

function saveAudi(req, res){
    var audi = new Audi();
    var params = req.body;
    var user = auth.decode(req.headers.authorization);

    audi.name = params.name;
    audi.link = params.link;
    audi.issolext = params.issolext;
    audi.datecreat = Date.now();
    audi.personcreat = user.name;

    audi.save((err, audiStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audiStored){
                res.status(404).send({message:'Error al guardar Audio'});
            }else{
                res.status(200).send({audi:audiStored});
            }
        }
    });
}
function getAudi(req, res){
    var audiId = req.params.id;

    Audi.findById(audiId, (err, audi) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audi){
                res.status(404).send({message:'Error no existe Audio'});
            }else{
                res.status(200).send({audi:audi});
            }
        }
    });
}
function getAudiPublic(req, res){
    var audiId = req.params.name;

    Audi.findOne({name:audiId}, (err, audi) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audi){
                res.status(404).send({message:'Error no existe Audio'});
            }else{
                res.status(200).send({audi:audi});
            }
        }
    });
}
function getsAudis(req, res){
    var page = req.params.page;
    var itemPerpage = 3;

    Audi.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerpage, function(err, audi, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audi){
                res.status(404).send({message:'Error no exiten Audios'});
            }else{
                return res.status(200).send({
                   total: total,
                   audi:audi 
                });
            }
        }
    });
}
function getsAudisPublic(req, res){
    var page = req.params.page;
    var itemPerpage = 3;

    Audi.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerpage, function(err, audi, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audi){
                res.status(404).send({message:'Error no exiten Audios'});
            }else{
                return res.status(200).send({
                   total: total,
                   audi:audi 
                });
            }
        }
    });
}
function updateAudi(req, res){
    var user = auth.decode(req.headers.authorization);
    var audiId = req.params.id;
    var update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    Audi.findByIdAndUpdate(audiId, update, (err, audiUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audiUpdate){
                res.status(404).send({message:'Error no se actualizo'});
            }else{
                res.status(200).send({audiUpdate});
            }
        }
    });
}
function deleteAudi(req, res){
    var user = auth.decode(req.headers.authorization);
    var audiId = req.params.id;
    var update = req.body;
    update.datedel = Date.now();
    update.persondel = user.name;

    Audi.findByIdAndUpdate(audiId, update, (err, audiUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!audiUpdate){
                res.status(404).send({message:'Error no se elimino'});
            }else{
                res.status(200).send({audiUpdate});
            }
        }
    });
}

module.exports = {
    saveAudi,
    getAudi,
    getAudiPublic,
    getsAudis,
    getsAudisPublic,
    updateAudi,
    deleteAudi
}