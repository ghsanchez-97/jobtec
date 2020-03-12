'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var Video = require('../models/video');
var auth = require('../middlewares/authenticated')

function saveVideo(req, res){
    var video = new Video();
    var params = req.body;
    var user = auth.decode()

    video.name = params.name;
    video.link = params.link;
    video.datecreat = Date.now(); 
    Video.personcreat = user.name;

    video.save((err, videoStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!videoStored){
                res.status(404).send({message:'Error no se guardo Video'});
            }else{
                res.status(200).send({video:videoStored});
            }
        }
    })
    
}
function getVideo(req, res){
    var videoId = req.params.id;
    
    Video.findById(videoId, (err, video) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!video){
                res.status(404).send({message:'Error no existe Video'});
            }else{
                res.status(200).send({video});
            }
        }
    });
}
function getVideoPublic(req, res){
    var videoId = req.params.name;

    Video.findOne({name: videoId}, (err, video) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!video){
                res.status(404).send({message:'Error no exite Video'});
            }else{
                res.status(200).send({video});
            }
        }
    });
}
function getsVideo(req, res){
    var page = req.params.page;
    var itemPerPage = 3;

    Video.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerPage, function(err, video, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!video){
                res.status(404).send({message:'Error no existen Videos'});
            }else{
                return res.status(200).send({
                    total:total,
                    video
                });
            }
        }
    });

}
function getsVideoPublic(req, res){
    var page = req.params.page;
    var itemPerPage = 3;

    Video.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerPage, function(err, video, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!video){
                res.status(404).send({message:'Error no existen Videos'});
            }else{
                return res.status(200).send({
                    total:total,
                    video
                });
            }
        }
    });

}
function updateVideo(req, res){
    var user = auth.decode(req.headers.authorization);
    var videoId = req.params.id;
    var update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    Video.findByIdAndUpdate(videoId, update, (err, videoUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!videoUpdate){
                res.status(404).send({message:'Error no se actualizado Video'});
            }else{
                res.status(200).send({videoUpdate});
            }
        }
    });
}
function deleteVideo(req, res){
    var user = auth.decode(req.headers.authorization);
    var videoId = req.params.id;
    var update = req.body;
    update.datedel = Date.now();
    update.persondel = user.name;

    Video.findByIdAndUpdate(videoId, update, (err, videoUpdate) => {
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!videoUpdate){
                res.status(404).send({message:'Error no se elimino'});
            }else{
                res.status(200).send({videoUpdate});
            }
        }
    });
}

module.exports = {
    saveVideo,
    getVideo,
    getVideoPublic,
    getsVideo,
    getsVideoPublic,
    updateVideo,
    deleteVideo
}