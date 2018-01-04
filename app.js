const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

//load user model
require('./models/User');

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

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global variables
app.use((req, res, next)=>{
  res.locals.user = req.user || null;
  next();
});

//use routes
app.use('/auth',auth);


const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});