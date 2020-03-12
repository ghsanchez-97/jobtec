'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var Newletters = require ('../models/newsletters');
var auth = require('../middlewares/authenticated');

function saveNewletters(req, res){
    var newsletters = new Newletters();
    var params = req.body;
    var user = auth.decode(req.headers.authorization);

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
    var newslettersId = req.params.id;

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
    var newslettersId = req.params.name;

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
    var page = req.params.page;
    var itemPerPage = 3;

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
    var page = req.params.page;
    var itemPerPage = 3;

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
    var user = auth.decode(req.headers.authorization);
    var newslettersId = req.params.id;
    var update = req.body;
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
    var user = auth.decode(req.headers.authorization);
    var newslettersId = req.params.id;
    var update = req.body;
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