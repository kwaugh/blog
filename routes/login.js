var bcrypt = require('bcrypt-nodejs');

var INVALID_LOGIN = 'Invalid username or password';

module.exports = function(req, res){
  if(req.param('username') && req.param('password')){
    //console.log('username: ' + req.param('username') + '  password: ' + req.param('password'));
    USERS.findOne({'username': req.param('username')}, function(err, doc){
      if(err || !doc){
        console.log('There was an error when logging in');
        res.render('login', {loginError: INVALID_LOGIN});
      }
      else{
        console.log('The doc is: ' + doc);
        bcrypt.compare(req.param('password'), doc.password, function(err, result){
          if(result){
            req.session.name = doc.name;
            req.session.username = req.param('username');
            req.session.isLoggedIn = true;
            if (req.session.redirectLoc) {
                var redirectLoc = req.session.redirectLoc;
                req.session.redirectLoc = null;
                res.redirect(redirectLoc);
            } else {
                res.redirect('/welcome'); 
            }
          }
          else
            res.render('login', {loginError: INVALID_LOGIN});
        });
      }
    });   
  }
  else
    if(req.session.unauthorizedAccess){
      req.session.unauthorizedAccess = false;
      res.render('login', {message: 'Please log in'});
    }
    else if(req.session.justLoggedOut){
      req.session.justLoggedOut = false;
      res.render('login', {message: 'You have been logged out'});
    }
    else
      res.render('login');
};
