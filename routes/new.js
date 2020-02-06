'use strict'

var express = require('express');
var NewController = require('../controllers/new');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/new'});

api.post('/NewNew', md_auth.ensureAuth, NewController.saveNew);
api.get('/getNew/:id', md_auth.ensureAuth, NewController.getNew);
api.get('/getNewPublic/:name', NewController.getNewPublic);
api.get('/getNews/:page?', md_auth.ensureAuth, NewController.getNews);
api.get('/getNewsPublic/:page?', NewController.getNewsPublic);
api.put('/updateNew/:id', md_auth.ensureAuth, NewController.updateNew);
api.post('/uploadImageNew/:id', [md_upload, md_auth.ensureAuth], NewController.uploadImage);
api.get('/getImageNew/:imageFile', NewController.getImageNew);
api.delete('/deleteNew/:id', md_auth.ensureAuth, NewController.deleteNew)

module.exports = api