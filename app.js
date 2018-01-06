const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

//load user model
require('./models/user');
//load story model
require('./models/story');

//passport config
require('./config/passport')(passport);   //immediatelly pass passport

//Load routes
const auth = require('./routes/auth');  //load file to use routes
const index = require('./routes/index'); 
const stories = require('./routes/stories');

//load keys
const keys = require('./config/keys');

//hbs helpers
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs');

//map global promise
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(keys.mongoURI,{
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

//handlebars middleware
app.engine('handlebars', exphbs({
  helpers:{
    truncate: truncate, //added hbs helpers to middleware so they are usable in .handlebars files
    stripTags: stripTags,
    formatDate: formatDate,
    select: select,
    editIcon: editIcon
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



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

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);




const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});