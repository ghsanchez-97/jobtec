'use strict'

var express = require('express');
var EventController = require('../controllers/event');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/user'});

api.post('/newEvent', md_auth.ensureAuth, EventController.newEvent);
api.get('/getEvent/:id', md_auth.ensureAuth, EventController.getEvent);
api.get('/getEventPublic/:id', EventController.getEventPubli);

module.exports = api;