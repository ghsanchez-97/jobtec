'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');
var auth = require('../middlewares/authenticated');
var Event = require('../models/event');

function newEvent(req, res){
    var event = new Event();
    var params = req.body;
    var user = auth.decode(req.headers.authorization);

    event.name = params.name;
    event.link = params.link;
    event.image = 'null'
    event.datecreat = Date.now();
    event.personcreat = user.name;

    event.save((err, eventStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!eventStored){
                res.status(404).send({message:'Error en guardar Evento'});
            }else{
                res.status(200).send({event:eventStored});
            }
        }
    });
}
function getEvent(req, res){
    var enventId = req.params.id;
    
    Event.findById(enventId, (err, event)=>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!event){
                res.status(404).send({message:'Evento no existe'});
            }else{
                res.status(200).send({event:event});
            }
        }
    });
}
function getEventPubli(req, res){
    var eventNm = req.params.name;

    Event.findOne({name:eventNm}, (err, event)=>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!event){
                res.status(404).send({message:'No existe el Evento'});
            }else{
                res.status(200).send({event});
            }
        }
    });
}
function getEvents(req, res){
    var page = req.params.page;
    var itemPerPage = 1000000;

    Event.find({$where: function(){
        return (this.datedel == null)
    }}).sort('name').paginate(page, itemPerPage, function(err, event, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!event){
                res.status(404).send({message:'No hay eventos creados!!!'});
            }else{
                return res.status(200).send({
                    Total: total,
                    event: event
                });
            }
        }
    });
}
function getEventsPublic(req, res){
    var page = req.params.page;
    var itemPerPage = 3;

    Event.find({$where: function(){
        return (this.datedel == null)
    }}).sort('name').paginate(page, itemPerPage, function(err, event, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!event){
                res.status(404).send({message:'No hay eventos creados!!!'});
            }else{
                return res.status(200).send({
                    Total: total,
                    event: event
                });
            }
        }
    });
}
function updateEvent(req, res){
    var user = auth.decode(req.headers.authorization);
    var eventId = req.params.id;
    var update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    Event.findByIdAndUpdate(eventId, update, (err, eventUpdate)=>{
        if(err){
            res.status(500),send({message:'Error en la solicitud'});
        }else{
            if(!eventUpdate){
                res.status(404).send({message:'Error al actualizar evento'});
            }else{
                res.status(200).send({eventUpdate:eventUpdate});
            }        
        }
    });
}
function uploadImage(req, res){
    var enventId = req.params.id;
    var file_name = 'No subido....';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];


        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            
            Event.findByIdAndUpdate(enventId, {image: file_name}, (err, eventUpdate)=>{
                if(!eventUpdate){
                    res.status(404).send({message:'Error al subir imagen'});
                }else{
                    res.status(200).send({eventUpdate:eventUpdate})
                }
            });
        }else{
            res.status(200).send({message:'Error tipo de extensión'})
        }
    }else{
        res.status(200).send({message:'No has subido ninguna imagen...'});
    }
}
function getImageEvent(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/event/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe imagen...'});
        }
    });
}
function deleteEvent(req, res){
    var user = auth.decode(req.headers.authorization); 
    var eventId = req.params.id;
    var update = req.body;
    update.datedel = Date.now();
    update.persondel = user.name;

    Event.findByIdAndUpdate(eventId, update, (err, eventUpdate)=>{
       if(err){
           res.status(500).send({message:'Error en la solicitud'});
       }else{
           if(!eventUpdate){
               res.status(404).send({message:'Evento no existe'});
           }else{
               res.status(200).send({event:eventUpdate});
           }
       } 
    });
}

module.exports = {
    newEvent,
    getEvent,
    getEventPubli,
    getEvents,
    getEventsPublic,
    updateEvent,
    uploadImage,
    getImageEvent,
    deleteEvent
}