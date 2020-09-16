'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const Agend = require('../models/agend');
const auth = require('../middlewares/authenticated');

function saveAgend(req, res){
    const agend = new Agend();
    const params = req.body;
    const user = auth.decode(req.headers.authorization);

    agend.name = params.name;
    agend.description = params.description;
    agend.detail = params.detail;
    agend.date = params.date;
    agend.datecreat = Date.now();
    agend.personcreat = user.name;

    agend.save((err, agendStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agendStored){
                res.status(404).send({message:'Error al guardar Agenda'});
            }else{
                res.status(200).send({agend:agendStored});
            }
        }
    });

}
function getAgend(req, res){
    const agendId = req.params.id;

    Agend.findById(agendId, (err, agend) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no exite Agenda'});
            }else{
                res.status(200).send({agend});
            }
        }
    });
}
function getAgendPublic(req, res){
    const agendId = req.params.name;

    Agend.findOne({name:agendId}, (err, agend) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no exite Agenda'});
            }else{
                res.status(200).send({agend});
            }
        }
    });
}
function getsAgends(req, res){
    const page = req.params.page;
    const itemPerPage = 100000000;

    Agend.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerPage, function(err, agend, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no hay Agendas'});
            }else{
                return res.status(200).send({
                    total:total,
                    agend:agend,
                });
            }
        }
    });
}
function getsAgendsPublic(req, res){
    const page = req.params.page;
    const itemPerPage = 100000000;

    Agend.find({$where: function(){
        return (this.datedel == null);
    }}).sort('name').paginate(page, itemPerPage, function(err, agend, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agend){
                res.status(404).send({message:'Error no hay Agendas'});
            }else{
                return res.status(200).send({
                    total:total,
                    agend:agend,
                });
            }
        }
    });
}
function updateAgend(req, res){
    const user = auth.decode(req.headers.authorization);
    const agendId = req.params.id;
    const update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    Agend.findByIdAndUpdate(agendId, update, (err, agendUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agendUpdate){
                res.status(404).send({message:'Error no se actualizo Agenda'});
            }else{
                res.status(200).send({agendUpdate:agendUpdate});
            }
        }
    });
}
function deleteAgend(req, res){
    const user = auth.decode(req.headers.authorization);
    const agendId = req.params.id;
    const update = req.body;
    update.datedel = Date.now();
    update.personedel = user.name;

    Agend.findByIdAndUpdate(agendId, update, (err, agendUpdate) => {
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agendUpdate){
                res.status(404).send({message:'Error no se elimino'});
            }else{
                res.status(200).send({agend:agendUpdate});
            }
        }
    });
}

module.exports = {
    saveAgend,
    getAgend,
    getAgendPublic,
    getsAgends,
    getsAgendsPublic,
    updateAgend,
    deleteAgend
}