'use strict'

var express = require('express');
var bodyparse = require('body-parser');
const https = require('https');

var app = express();

//LOAD RUTS
var user_routes = require('./routes/user')

app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//configure headers http

//rutes base
app.use('/api', user_routes);

module.exports = app;