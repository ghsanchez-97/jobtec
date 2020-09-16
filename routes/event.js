'use strict'

const express = require('express');
const EventController = require('../controllers/event');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/event'});

api.post('/newEvent', md_auth.ensureAuth, EventController.newEvent);
api.get('/getEvent/:id', md_auth.ensureAuth, EventController.getEvent);
api.get('/getEventPublic/:name', EventController.getEventPubli);
api.get('/getEvents/:page?', md_auth.ensureAuth, EventController.getEvents);
api.get('/getEventsPublic/:page?', EventController.getEvents);
api.put('/updateEvent/:id', md_auth.ensureAuth, EventController.updateEvent);
api.post('/uploadImageEvent/:id',[md_auth.ensureAuth, md_upload], EventController.uploadImage);
api.get('/getImageEvent/:imageFile', EventController.getImageEvent);
api.delete('/deleteEvent/:id', md_auth.ensureAuth, EventController.deleteEvent);

module.exports = api;