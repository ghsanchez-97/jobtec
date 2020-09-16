'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret_key';

exports.ensureAuth = (req, res, next) =>{

    if(!req.headers.authorization){
        return res.status(403).send({message:'La petición no tiene autorización'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'Token ha expirado'});
        }
    }catch(e){
        return res.status(404).send({message:'Token no válido'});
    }
    next();
};

 exports.decode = (token) =>{
    try{
        var payload = jwt.decode(token, secret, true);
        return payload
    }catch(e){
        return null;
    }
}