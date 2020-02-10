'use strict'

var express = require('express');
var AgendController = require('../controllers/agend');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/newAgend', md_auth.ensureAuth, AgendController.saveAgend);
api.get('/getAgend/:id', md_auth.ensureAuth, AgendController.getAgend);
api.get('/getAgendPublic/:name', AgendController.getAgendPublic);
api.get('/getsAgends/:page?', md_auth.ensureAuth, AgendController.getsAgends);
api.get('/getsAgendsPublic/:page?', AgendController.getsAgendsPublic);
api.put('/updateAgend/:id', md_auth.ensureAuth, AgendController.updateAgend);

module.exports = api;