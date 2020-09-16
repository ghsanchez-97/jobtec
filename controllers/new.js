'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const New = require('../models/news');
const auth = require('../middlewares/authenticated');

function saveNew(req, res){
    const nw = new New();
    const params = req.body;
    const user = auth.decode(req.headers.authorization);

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
    const newId = req.params.id;

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
    const newId = req.params.name;

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
    const page = req.params.page;
    const itemPerPage = 1000000;

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
    const page = req.params.page;
    const itemPerPage = 1000000;

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
    const user = auth.decode(req.headers.authorization);
    const newId = req.params.id;
    const update = req.body;
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
    const newId = req.params.id;
    const file_name = 'No subido...';

    if(req.files){
        const file_path = req.files.image.path;
        const file_split = file_path.split('\/');
        const file_name = file_split[2];
        const ext_split = file_name.split('\.');
        const file_ext = ext_split[1];

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
    const imageFile = req.params.imageFile;
    const path_file = './uploads/new/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message:'No existe imagen....'})
        }
    })
}
function deleteNew(req, res){
    const user = auth.decode(req.headers.authorization);
    const newId = req.params.id;
    const update = req.body;
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