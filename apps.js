'use strict'

var express = require('express');
var bodyparse = require('body-parser');
const https = require('https');

var app = express();

//LOAD RUTS
var user_routes = require('./routes/user');
var event_routes = require('./routes/event');
var new_routes = require('./routes/new')

app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//configure headers http

//rutes base
app.use('/api', user_routes);
app.use('/api', event_routes);
app.use('/api', new_routes);

module.exports = app;