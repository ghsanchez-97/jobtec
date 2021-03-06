'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePagination = require('mongoose-pagination');
const Agent = require('../models/agent');
const auth = require('../middlewares/authenticated');

function saveAgent(req, res){
    let agent = new Agent();
    let params = req.body;
    const user = auth.decode(req.headers.authorization);

    agent.name = params.name;
    agent.categoria = params.categoria;
    agent.area = params.area;
    agent.decription = params.decription;
    agent.horario = params.horario;
    agent.time_job = params.time_job;
    agent.salario = params.salario;
    agent.lugar = params.lugar;
    agent.datecreat = Date.now();
    agent.personcreat = user.name;

    agent.save((err, agentStored) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agentStored){
                res.status(404).send({message:'Error al guardar Agenda'});
            }else{
                res.status(200).send({agent:agentStored});
            }
        }
    });

}
function getAgent(req, res){
    let agentId = req.params.id;

    Agent.findById(agentId, (err, agent) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agent){
                res.status(404).send({message:'Error no exite Agenda'});
            }else{
                res.status(200).send({agent});
            }
        }
    });
}
function getAgentPublic(req, res){
    let agentId = req.params.name;

    Agent.findOne({name:agentId}, (err, agent) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agent){
                res.status(404).send({message:'Error no exite Agenda'});
            }else{
                res.status(200).send({agent});
            }
        }
    });
}
function getsAgents(req, res){
    let page = req.params.page;
    let itemPerPage = 100000000;

    Agent.find().sort('name').paginate(page, itemPerPage, function(err, agent, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agent){
                res.status(404).send({message:'Error no hay Agendas'});
            }else{
                return res.status(200).send({
                    total:total,
                    agent:agent,
                });
            }
        }
    });
}
function getsAgentsPublic(req, res){
    let page = req.params.page;
    let itemPerPage = 10000000;

    Agent.find().sort('name').paginate(page, itemPerPage, function(err, agent, total){
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agent){
                res.status(404).send({message:'Error no hay Agendas'});
            }else{
                return res.status(200).send({
                    total:total,
                    agent:agent,
                });
            }
        }
    });
}
function updateAgent(req, res){
    const user = auth.decode(req.headers.authorization);
    let agentId = req.params.id;
    const update = req.body;
    update.dataedit = Date.now();
    update.personedit = user.name;

    Agent.findByIdAndUpdate(agentId, update, (err, agentUpdate) =>{
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agentUpdate){
                res.status(404).send({message:'Error no se actualizo Agenda'});
            }else{
                res.status(200).send({agentUpdate:agentUpdate});
            }
        }
    });
}
function deleteAgent(req, res){
    const user = auth.decode(req.headers.authorization);
    let agentId = req.params.id;
    const update = req.body;
    update.datedel = Date.now();
    update.personedel = user.name;

    Agent.findByIdAndRemove(agentId, update, (err, agentUpdate) => {
        if(err){
            res.status(500).send({message:'Error en la solicitud'});
        }else{
            if(!agentUpdate){
                res.status(404).send({message:'Error no se elimino'});
            }else{
                res.status(200).send({agent:agentUpdate});
            }
        }
    });
}

module.exports = {
    saveAgent,
    getAgent,
    getAgentPublic,
    getsAgents,
    getsAgentsPublic,
    updateAgent,
    deleteAgent
}