'use strict'

var express = require('express');
var AgendController = require('../controllers/agend');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/newAgend', md_auth.ensureAuth, AgendController.saveAgend);

module.exports = api;