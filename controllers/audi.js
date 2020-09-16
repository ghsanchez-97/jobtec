'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const Audi = require('../models/Audi');
const auth = require('../middlewares/authenticated');

function saveAudi(req, res){
    const audi = new Audi();
    const params = req.body;
    const user = auth.decode(req.headers.authorization);

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
    const audiId = req.params.id;

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
    const audiId = req.params.name;

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
    const page = req.params.page;
    const itemPerpage = 1000000;

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
    const page = req.params.page;
    const itemPerpage = 1000000;

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
    const user = auth.decode(req.headers.authorization);
    const audiId = req.params.id;
    const update = req.body;
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
    const user = auth.decode(req.headers.authorization);
    const audiId = req.params.id;
    const update = req.body;
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