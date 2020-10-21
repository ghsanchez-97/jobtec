'use strict'

const express = require('express');
const AgentController = require('../controllers/agent');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/newAgent', md_auth.ensureAuth, AgentController.saveAgent);
api.get('/getAgent/:id', md_auth.ensureAuth, AgentController.getAgent);
api.get('/getAgentPublic/:name', AgentController.getAgentPublic);
api.get('/getsAgents/:page?', md_auth.ensureAuth, AgentController.getsAgents);
api.get('/getsAgentsPublic/:page?', AgentController.getsAgentsPublic);
api.put('/updateAgent/:id', md_auth.ensureAuth, AgentController.updateAgent);
api.delete('/deleteAgent/:id', md_auth.ensureAuth, AgentController.deleteAgent);

module.exports = api;