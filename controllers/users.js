'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path')
var mongoosePagination = require('mongoose-pagination');

function saveUser(req, res){
var user = new User();
var params = req.body;

user.firstname = params.firstname;
user.middlename = params.middlename;
user.firstlastname = params.firstlastname;
user.middlelastname = params.middlelastname;
user.email = params.email;
user.rol = params.rol;
user.image = 'null';
user.fechaagregada = Date.now();
user.fechamodificado = null;
user.fechaeliminado = null;

 if(params.password){
   //Encrypt pass and save data
   bcrypt.hash(params.password, null, null, function(err,hash){
    user.password = hash;
    
    if(user.firstname != null && user.middlename != null && user.firstlastname != null &&  user.firstlastname != null && user.middlelastname != null && user.email != null && user.rol != null){
    //Save user
    user.save((err, userStored) =>{
      if(err){
        res.status(500).send({message: 'Error al guardar el usuario'});
      }else{
       if(!userStored){
          res.status(404).send({message: "No se ha registrado el Usuario"});
       }else{
          res.status(200).send({user: userStored});
       }
      }
   });
}else{
 res.status(200).send({ message: 'Complete los campos'});
}
 });

 }else{
   res.status(200).send({message:'Introducir la contraseña'});
 }

}

function getUser(req, res){
  var userId = req.params.id;

  User.findById(userId, (err, user) =>{
    if(err){
      res.status(500).send({message:'Error en la solicitud'});
    }else{
      if(!user){
        res.status(404).send({message:'Usuario no existe'});
      }else{
        res.status(200).send({user});
      }
    }
  });
}

function getUsers(req, res){
  var page = req.params.page;
  var itemPerPage = 5;

  User.find({ $where: function(){
    return (this. fechaeliminado == null)
  }}).sort('firstname').paginate(page, itemPerPage, function(err, user, total){
    if(err){
      res.status(500).send({message:'Error en la solicitud'});
    }else{
      if(!user){
        res.status(404).send({message:'No hay Usuarios!!!'});
      }else{
        return res.status(200).send({
          total_Item: total,
          user: user,
        });
      }
    }
  })
}

function loginUser(req, res){
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({email:email}, (err, user) =>{
    if(err){
      res.status(500).send({message: 'Error en la solicitud'});      
    }else{
      if(!user){
        res.status(404).send({message:'Usuario no encontrado'});
      }else{
        bcrypt.compare(password, user.password, function(err,check){
          
          if(check){
            if(params.gethash){
              res.status(200).send({
                token: jwt.createToken(user)
              })
            }else{
              res.status(200).send({user});
            }
          }else{
            res.status(404).send({message:'Usuario no ha podido loguease'});
          }
        });
      }
    }
  });
}

function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;
  update.fechamodificado = Date.now();

  User.findByIdAndUpdate(userId, update, (err,userUpdate) =>{
    if(err){
      res.status(500).send({message: 'Error al actualizar el usuario'});
    }else{
      if(!userUpdate){
        res.status(404).send({message:'No se ha podido actualizar el usuario'});
      }else{
        res.status(200).send({user:userUpdate});
      }
    }
  });
}

function uploadImage(req, res){
  var userId = req.params.id;
  var file_name = 'No subido...'

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png'  || file_ext == 'jpg'){
      User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate)=>{
        if(!userUpdate){
          res.status(404).send({message:'No se ha podido actulizar'});
        }else{
          res.status(200).send({user:userUpdate});
        }
      });
    }else{
      res.status(200).send({message:'Extensión no valida'});
    }
  }else{
    res.status(200).send({message:'No has subido ninguna imagen...'})
  }
}

function getImageFile(req, res){
  var imageFile = req.params.imageFile;
  var path_file = './uploads/user/'+imageFile;

  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message:'No existe imagen...'})
    }
  });
}

module.exports = {
  saveUser,
  getUser,
  getUsers,
  updateUser,
  uploadImage,
  getImageFile,
  loginUser 
};