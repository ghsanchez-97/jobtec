'use strict'

const express = require('express');
const AudiContraller = require('../controllers/audi');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/NewAudi', md_auth.ensureAuth, AudiContraller.saveAudi);
api.get('/getAudi/:id', md_auth.ensureAuth, AudiContraller.getAudi);
api.get('/getAudiPublic/:name', AudiContraller.getAudiPublic);
api.get('/getsAudi/:page?', md_auth.ensureAuth, AudiContraller.getsAudis);
api.get('/getsAudiPublic/:page?', AudiContraller.getsAudisPublic);
api.put('/updateAudi/:id', md_auth.ensureAuth, AudiContraller.updateAudi);
api.delete('/deleteAudi/:id', md_auth.ensureAuth, AudiContraller.deleteAudi);

module.exports = api;