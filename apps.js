'use strict'

const express = require('express');
const bodyparse = require('body-parser');
const https = require('https');

const app = express();

//LOAD RUTS
const user_routes = require('./routes/user');
const event_routes = require('./routes/event');
const new_routes = require('./routes/new');
const agend_routes = require('./routes/agend');
const audi_routes = require('./routes/audi');
const newletters_routes = require('./routes/newletters');
const video_routes = require('./routes/video');

app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//configure headers http

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutes base
app.use('/api', user_routes);
app.use('/api', event_routes);
app.use('/api', new_routes);
app.use('/api', agend_routes);
app.use('/api', audi_routes);
app.use('/api', newletters_routes);
app.use('/api', video_routes);

module.exports = app;