'use strict'

var express = require('express');
var UserController = require('../controllers/users');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/user'});

api.post('/register', md_auth.ensureAuth, UserController.saveUser);
api.delete('/deleteuser/:id', md_auth.ensureAuth, UserController.deleteUser);
api.put('/updateUser/:id', md_auth.ensureAuth, UserController.updateUser);
api.get('/getUser/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/getUsers/:page?', md_auth.ensureAuth, UserController.getUsers);
api.post('/upload-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image/:imageFile', UserController.getImageFile);
api.post('/login', UserController.loginUser);

module.exports = api;