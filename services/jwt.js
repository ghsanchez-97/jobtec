'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret_key';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        firstname: user.firstname,
        firstlastname: user.firstlastname,
        name: user.firstname =+ user.firstlastname,
        email: user.email,
        role: user.rol,
        image: user.image,
        iat: moment().unix,
        exp: moment().add(10, 'day').unix
    };

    return jwt.encode(payload, secret);
};