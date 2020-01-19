'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key';
var user = null;

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'La petición no tiene autorización'});
    }
    
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.encode(token, secret);
        user = payload;

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'Token ha expirado'});
        }
    }catch(ex){
        return res.status(404).send({message:'Token no válido'});
    }

    req.user = payload;

    next();
};

exports.decode = function(token){
    try{
        const payload = jwt.decode(token, secret);
        return payload;
    }catch(error){
        return null;
    }
}
exports.user = user;