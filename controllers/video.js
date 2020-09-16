'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const Video = require('../models/video');
const auth = require('../middlewares/authenticated')

function saveVideo(req, res){
    const video = new Video();
    const params = req.body;
    const user = auth.decode()

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
    const videoId = req.params.id;
    
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
    const videoId = req.params.name;

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
    const page = req.params.page;
    const itemPerPage = 1000000;

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
    const page = req.params.page;
    const itemPerPage = 1000000;

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
    const user = auth.decode(req.headers.authorization);
    const videoId = req.params.id;
    const update = req.body;
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
    const user = auth.decode(req.headers.authorization);
    const videoId = req.params.id;
    const update = req.body;
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