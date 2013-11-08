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
    res.render('login');
};