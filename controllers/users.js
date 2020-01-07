'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function saveUser(req, res){
var user = new User();
var params = req.body;
console.log(params)

user.firstname = params.firstname;
user.middlename = params.middlename;
user.firstlastname = params.firstlastname;
user.middlelastname = params.middlelastname;
user.email = params.email;
user.rol = params.rol;
user.image = 'null';

 if(params.password){
   //Encrypt pass and save data
   bcrypt.hash(params.password, null, null, function(err,hash){
    user.password = hash;
    
    if(user.firstname != null && user.middlename != null && user.firstlastname != null &&  user.firstlastname != null && user.middlelastname != null && user.email != null && user.rol != null){
    //
    }
    else{
     res.status(200).send({ message: 'Complete los campos'});
    }
 });

 }else{
   res.status(500).send({message:'Introducir la contraseña'});
 }

}

module.exports = {
  saveUser 
};