'use strict'

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const app = require('./apps');
const port = process.env.PORT || 3000 

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://ghsanchez97:Gh$anchez97@db-job.bdg9e.mongodb.net/jobtec?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true}, (err, res)=>{

  if(err){
    throw err;
  }else{
    console.log("The database is running correctly...");
    app.listen(port, function(){
    console.log("Server API REST GUNI liste " + port);
    });
  }
});