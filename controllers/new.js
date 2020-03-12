'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var New = require('../models/news');
var auth = require('../middlewares/authenticated');

function saveNew(req, res){
    var nw = new New();
    var params = req.body;
    var user = auth.decode(req.headers.authorization);

    nw.name = params.name;
    nw.detail = params.detail;
    nw.link = params.link;
    nw.islinot = params.islinot;
    nw.ispriseg = params.ispriseg;
    nw.image = null;
    nw.datecreat = Date.now();
    nw.personcreat = user.name;

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
function getNewsPublic(req, res){
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
function updateNew(req, res){
    var user = auth.decode(req.headers.authorization);
    var newId = req.params.id;
    var update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    New.findByIdAndUpdate(newId, update, (err, newUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newUpdate){
                res.status(404).send({message:'Error al actualizar'});
            }else{
                res.status(200).send({nw:newUpdate});
            }
        }
    });
}
function uploadImage(req, res){
    var newId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
            New.findByIdAndUpdate(newId, {image:file_name}, (err, newUpdate) =>{
                if(!newUpdate){
                    res.status(404).send({message:'Error al subir Imagen'});
                }else{
                    res.status(200).send({nw:newUpdate});
                }
            });
        }else{
            res.status(200).send({message:'Extensión de imagen no valido'});
        }
    }else{
        res.status(200).send({message:'No has subido imagen....'});
    }
}
function getImageNew(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/new/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message:'No existe imagen....'})
        }
    })
}
function deleteNew(req, res){
    var user = auth.decode(req.headers.authorization);
    var newId = req.params.id;
    var update = req.body;
    update.datedel = Date.now();
    update.personedel = user.name;

    New.findByIdAndUpdate(newId, update, (err, newUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!newUpdate){
                res.status(404).send({message:'Error al eliminar'});
            }else{
                res.status(200).send({nw:newUpdate});
            }
        }
    });
}

module.exports = {
    saveNew,
    getNew,
    getNewPublic,
    getNews,
    getNewsPublic,
    updateNew,
    uploadImage,
    getImageNew,
    deleteNew
}