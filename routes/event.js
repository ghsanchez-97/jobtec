'use strict'

var express = require('express');
var EventController = require('../controllers/event');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/event'});

api.post('/newEvent', md_auth.ensureAuth, EventController.newEvent);
api.get('/getEvent/:id', md_auth.ensureAuth, EventController.getEvent);
api.get('/getEventPublic/:name', EventController.getEventPubli);
api.get('/getEvents/:page?', md_auth.ensureAuth, EventController.getEvents);
api.get('/getEventsPublic/:page?', EventController.getEvents);
api.put('/updateEvent/:id', md_auth.ensureAuth, EventController.updateEvent);
api.put('/updateEvent/:id', md_auth.ensureAuth, EventController.updateEvent);
api.post('/uploadImageEvent/:id',[md_auth.ensureAuth, md_upload], EventController.uploadImage);
api.get('/getImageEvent/:imageFile', EventController.getImageEvent);
api.delete('/deleteEvent/:id', md_auth.ensureAuth, EventController.deleteEvent);

module.exports = api;