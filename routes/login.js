var databaseUrl = 'blog';
var collections= ['users'];
var db = require('mongojs').connect(databaseUrl, collections);
var bcrypt = require('bcrypt');

module.exports = function(req, res){
  if(req.param('username') && req.param('password')){
    console.log('username: ' + req.param('username') + '  password: ' + req.param('password'));
    db.users.findOne({'username': req.param('username')}, function(err, doc){
      if(err || !doc){
        console.log('There was an error when logging in');
        res.render('login', {loginError: 'The username or password that you specified is invalid'});
      }
      else{
        console.log('The doc is: ' + doc);
        bcrypt.compare(req.param('password'), doc.password, function(err, result){
          if(result){
            //db.users.findOne({
            req.session.name = doc.name;
            req.session.username = req.param('username');
            req.session.isLoggedIn = true;
            res.redirect('/welcome'); 
          }
          else
            res.render('login', {loginError: 'The username or password that you specified is invalid'});
        });
      }
    });   
  }
  else
    if(req.session.unauthorizedAccess){
      req.session.unauthorizedAccess = false;
      res.render('login', {message: 'You must first log in before you can access this page'});
    }
    else if(req.session.justLoggedOut){
      req.session.justLoggedOut = false;
      res.render('login', {message: 'You have been logged out'});
    }
    else
      res.render('login');
};