const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')

//passport config
require('./config/passport')(passport);   //immediatelly pass passport
//Load routes
const auth = require('./routes/auth');  //load file to use routes
//load keys
const keys = require('./config/keys');
//map global promise
mongoose.Promise = global.Promise;
//mongoose connect
mongoose.connect(keys.mongoURI,{
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




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