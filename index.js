'use strict'

const mongoose = require('mongoose');
const app = require('./apps');
const port = process.env.PORT || 3000 

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Guni', {useNewUrlParser: true,  useUnifiedTopology: true}, (err, res)=>{

  if(err){
    throw err;
  }else{
    console.log("The database is running correctly...");
    app.listen(port, function(){
    console.log("Server API REST GUNI liste " + port);
    });
  }
});