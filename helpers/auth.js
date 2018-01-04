module.exports = {
  ensureAuthenticated: (req, res, next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  },
  ensureGuest: (req, res, next)=>{
    if(req.isAuthenticated()){
      res.redirect('/dashboard');
    } else {                            //weird header errors without else,must be there
      return next();
    }
  }
}