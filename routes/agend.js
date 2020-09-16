'use strict'

const express = require('express');
const AgendController = require('../controllers/agend');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/newAgend', md_auth.ensureAuth, AgendController.saveAgend);
api.get('/getAgend/:id', md_auth.ensureAuth, AgendController.getAgend);
api.get('/getAgendPublic/:name', AgendController.getAgendPublic);
api.get('/getsAgends/:page?', md_auth.ensureAuth, AgendController.getsAgends);
api.get('/getsAgendsPublic/:page?', AgendController.getsAgendsPublic);
api.put('/updateAgend/:id', md_auth.ensureAuth, AgendController.updateAgend);
api.delete('/deleteAgend/:id', md_auth.ensureAuth, AgendController.deleteAgend);

module.exports = api;