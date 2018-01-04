const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
//load user model
const User = mongoose.model('users');

module.exports = (passport) => {
  //define strategy
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true   //needs to be here so google login works with heroku(http protocol)
    }, (accessToken, refreshToken, profile, done)=>{
      //console.log(accessToken);
      //console.log(profile);

      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?')); //removes everything after ? in json we get
      
      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      //check for existing user
      User.findOne({
        googleID: profile.id
      }).then(user=>{
        if(user){
          //return user
          done(null, user);   //we have no error
        } else {
          //create user
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
    })
  );

  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id).then(user => done(null, user));
  });
}