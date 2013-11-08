var databaseUrl = 'blog';
var collections= ['users'];
var db = require('mongojs').connect(databaseUrl, collections);
var bcrypt = require('bcrypt');

function isValidUsername(username){
  console.log('testing username');
  console.log(username);
  var valid = /[\w-]{3,20}/;
  return valid.test(username);
  
}

function isValidPw(pw){
  var valid = /[\w._%-]{3,20}/;
  return valid.test(pw);
}

function isValidEmail(email){
  var valid = /[\S]+[@][\S]+.[\S]/;
  if(valid.test(email))
    return true;
  else if (email.length === 0)
    return true;
  return false;
}

module.exports = function(req, res){
  var username = req.param('username');
  var pw = req.param('password');
  var email = req.param('email');
  console.log('username ', username, ' password ', pw, ' email ', email);
  if(req.param('username') && req.param('password') && req.param('verifyPassword'))
  {
    console.log('is username valid?', isValidUsername(username));
    if(isValidUsername(username))
    {
      if(isValidPw(pw))
      {
        if(pw === req.param('verifyPassword'))
        {
          if(isValidEmail(email))
          {
            req.session.username = username;
            req.session.isLoggedIn = true;
            db.users.find({'username':username}, function(err, docs){
              if(!docs.length > 0){
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(pw, salt);
                db.users.save({'username': username, 'password': hash, 'email': email}, function(err, savedUser){
                  if(err)
                    console.log('THERE WAS AN ERROR');
                });
                res.redirect('/welcome');
              }
              else
                res.render('signup', {userError: "That username is already taken"});
            });
          }
          else
            res.render('signup', {username: username, emailError: "That's not a valid email address"});
        }
        else
          res.render('signup', {username: username, verifyPasswordError: "The passwords do not match"}); 
      }
      else
        res.render('signup', {username: username, pwError: "That's not a valid password"});
    }
    else
      res.render('signup', {userError: "That's not a valid username"});
  }
  else
    res.render('signup',{}); 
};