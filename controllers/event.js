'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const auth = require('../middlewares/authenticated');
const Event = require('../models/event');

function newEvent(req, res){
    const event = new Event();
    const params = req.body;
    const user = auth.decode(req.headers.authorization);

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
    const enventId = req.params.id;
    
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
    const eventNm = req.params.name;

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
    const page = req.params.page;
    const itemPerPage = 1000000;

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
    const page = req.params.page;
    const itemPerPage = 1000000;

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
    const user = auth.decode(req.headers.authorization);
    const eventId = req.params.id;
    const update = req.body;
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
    const enventId = req.params.id;
    const file_name = 'No subido....';

    if(req.files){
        const file_path = req.files.image.path;
        const file_split = file_path.split('\/');
        const file_name = file_split[2];

        const ext_split = file_name.split('\.');
        const file_ext = ext_split[1];


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
    const imageFile = req.params.imageFile;
    const path_file = './uploads/event/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe imagen...'});
        }
    });
}
function deleteEvent(req, res){
    const user = auth.decode(req.headers.authorization); 
    const eventId = req.params.id;
    const update = req.body;
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