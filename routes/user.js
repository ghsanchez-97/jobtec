'use strict'

var express = require('express');
var UserController = require('../controllers/users');

var api = express.Router();

api.post('/register', UserController.saveUser);

module.exports = api;