'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path')
const mongoosePagination = require('mongoose-pagination');
const auth = require('../middlewares/authenticated');

function saveUser(req, res){
const user = new User();
const params = req.body;
const use = auth.decode(req.headers.authorization);

user.firstname = params.firstname;
user.middlename = params.middlename;
user.firstlastname = params.firstlastname;
user.middlelastname = params.middlelastname;
user.email = params.email;
user.rol = params.rol;
user.image = 'null';
user.datecreat = Date.now();
user.personcreat = use.name;

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
  let userId = req.params.id;

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
  const page = req.params.page;
  const itemPerPage = 20;

  User.find().sort('firstname').paginate(page, itemPerPage, function(err, user, total){
    if(err){
      res.status(500).send({message:'Error en la solicitud'});
    }else{
      if(!user){
        res.status(404).send({message:'No hay Usuarios!!!'});
      }else{
        return res.status(200).send({
          total: total,
          user: user,
        });
      }
    }
  })
}

function loginUser(req, res){
  const params = req.body;
  const email = params.email;
  const password = params.password;

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
              });
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
  const user = auth.decode(req.headers.authorization);
  const userId = req.params.id;
  const update = req.body;
  update.dataedit = Date.now();
  update.personedit = user.name;

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
  const userId = req.params.id;
  const file_name = 'No subido...'

  if(req.files){
    const file_path = req.files.image.path;
    const file_split = file_path.split('\/');
    const file_name = file_split[2];
    const ext_split = file_name.split('\.');
    const file_ext = ext_split[1];

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
  const imageFile = req.params.imageFile;
  const path_file = './uploads/user/'+imageFile;

  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message:'No existe imagen...'})
    }
  });
}

function deleteUser(req, res){
  const user = auth.decode(req.headers.authorization);
  const userId = req.params.id;
  const update = req.body;
  update.datedel = Date.now();
  update.persondel = user.name;

  User.findByIdAndRemove(userId, update, (err, userUpdate) =>{
    if(err){
      res.status(500).send({message:'Error en la solicitud'});
    }else{
      if(!userUpdate){
        res.status(404).send({message:'Error en eliminar USUARIO'});
      }else{
        res.status(200).send({user:userUpdate});
      }
    }
  });
}

module.exports = {
  saveUser,
  getUser,
  deleteUser,
  getUsers,
  updateUser,
  uploadImage,
  getImageFile,
  loginUser 
};