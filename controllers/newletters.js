'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const Newletters = require ('../models/newsletters');
const auth = require('../middlewares/authenticated');

function saveNewletters(req, res){
    const newsletters = new Newletters();
    const params = req.body;
    const user = auth.decode(req.headers.authorization);

    newsletters.name = params.name;
    newsletters.link = params.link;
    newsletters.datecreat = Date.now();
    newsletters.personcreat = user.name;

    newsletters.save((err, newslettersStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newslettersStored){
                res.status(404).send({message:'Error al guardar'});
            }else{
                res.status(200).send({newslettersStored});
            }
        }
    });
}
function getNewletters(req, res){
    const newslettersId = req.params.id;

    Newletters.findById(newslettersId, (err, newsletters) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newsletters){
                res.status(404).send({message:'Error no exite Boletin'});
            }else{
                res.status(200).send({newsletters});
            }
        }
    });
}
function getNewlettersPublic(req, res){
    const newslettersId = req.params.name;

    Newletters.findOne({name: newslettersId}, (err, newsletters) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newsletters){
                res.status(404).send({message:'Error no existe Boletin'});
            }else{
                res.status(200).send({newsletters});
            }
        }
    });
}
function getsNewletters(req, res){
    const page = req.params.page;
    const itemPerPage = 1000000;

    Newletters.find({$where: function(){
        return (this.datedel ==  null);
    }}).sort('name').paginate(page, itemPerPage, function(err, newsletters, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newsletters){
                res.status(404).send({message:'Error no existen Boletines'});
            }else{
                return res.status(200).send({
                    total: total,
                    newsletters
                });
            }
        }
    });
}
function getsNewlettersPublic(req, res){
    const page = req.params.page;
    const itemPerPage = 1000000;

    Newletters.find({$where: function(){
        return (this.datedel ==  null);
    }}).sort('name').paginate(page, itemPerPage, function(err, newsletters, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newsletters){
                res.status(404).send({message:'Error no existen Boletines'});
            }else{
                return res.status(200).send({
                    total: total,
                    newsletters
                });
            }
        }
    });
}
function updateNewletters(req, res){
    const user = auth.decode(req.headers.authorization);
    const newslettersId = req.params.id;
    const update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    Newletters.findByIdAndUpdate(newslettersId, update, (err, newslettersUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newslettersUpdate){
                res.status(404).send({message:'Error no se actualizo Boletin'});
            }else{
                res.status(200).send({newslettersUpdate});
            }
        }
    });
}
function deleteNewletters(req, res){
    const user = auth.decode(req.headers.authorization);
    const newslettersId = req.params.id;
    const update = req.body;
    update.datedel = Date.now();
    update.persondel = user.name;

    Newletters.findByIdAndUpdate(newslettersId, update, (err, newslettersUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newslettersUpdate){
                res.status(404).send({message:'Error no se elimino'});
            }else{
                res.status(200).send({newslettersUpdate});
            }
        }
    });
}

module.exports = {
    saveNewletters,
    getNewletters,
    getNewlettersPublic,
    getsNewletters,
    getsNewlettersPublic,
    updateNewletters,
    deleteNewletters
}