'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var New = require('../models/news');

function saveNew(req, res){
    var nw = new New();
    var params = req.body;

    nw.name = params.name;
    nw.detail = params.detail;
    nw.link = params.link;
    nw.islinot = params.islinot;
    nw.ispriseg = params.ispriseg;
    nw.image = null;
    nw.datecreat = Date.now();


    nw.save((err, nwStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solictud'});
        }else{
            if(!nwStored){
                res.status(404).send({message:'Error al guardar'});
            }else{
                res.status(200).send({nw:nwStored});
            }
        }
    });
}

function getNew(req, res){
    var newId = req.params.id;

    New.findById(newId, (err, nw) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!nw){
                res.status(404).send({message:'Error no hay Noticia'});
            }else{
                res.status(200).send({nw});
            }
        }
    });
}
function getNewPublic(req, res){
    var newId = req.params.name;

    New.findOne({name:newId}, (err, nw) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!nw){
                res.status(404).send({message:'Error no hay Noticia'});
            }else{
                res.status(200).send({nw});
            }
        }
    });
}
function getNews(req, res){
    var page = req.params.page;
    var itemPerPage = 3;

    New.find({$where: function(){
        return (this.datedel == null)
    }}).sort('name').paginate(page, itemPerPage, function(err, nw, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!nw){
                res.status(404).send({message:'No hay Noticias !!!'});
            }else{
                return res.status(200).send({
                    total:total,
                    nw:nw,
                });
            }
        }
    })
}

module.exports = {
    saveNew,
    getNew,
    getNewPublic,
    getNews

}