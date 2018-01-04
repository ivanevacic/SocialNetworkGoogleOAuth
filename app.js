const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')

//passport config
require('./config/passport')(passport);   //immediatelly pass passport
//Load routes
const auth = require('./routes/auth');  //load file to use routes

const app = express();

app.get('/', (req, res)=>{
  res.send('It works');
});

//use routes
app.use('/auth',auth);


const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});