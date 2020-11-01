'use strict'

const express = require('express');
const bodyparse = require('body-parser');
const https = require('https');

const app = express();

//LOAD RUTS
const user_routes = require('./routes/user');
const agent_routes = require('./routes/agent');

app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//configure headers http

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    next();
});


//rutes base
app.use('/api', user_routes);
app.use('/api', agent_routes);


module.exports = app;