var bcrypt = require('bcrypt-nodejs');

function isValidName(name){
  var valid = /[\w]{1,30}/;
  return valid.test(name);
}

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
  var name = req.param('name');
  var username = req.param('username');
  var pw = req.param('password');
  var email = req.param('email');
  console.log('name', name, ' username ', username, ' password ', pw, ' email ', email);
  if(req.param('name') && req.param('username') && req.param('password') && req.param('verifyPassword'))
  {
    console.log('is username valid?', isValidUsername(username));
    if(isValidName(name))
    {
      if(isValidUsername(username))
      {
        if(isValidPw(pw))
        {
          if(pw === req.param('verifyPassword'))
          {
            if(isValidEmail(email))
            {
              req.session.name = name;
              req.session.morePosts = 0;
              req.session.username = username;
              req.session.isLoggedIn = true;
              USERS.find({'username':username}, function(err, docs){
                if(!docs.length > 0){
                  var salt = bcrypt.genSaltSync(10);
                  var hash = bcrypt.hashSync(pw, salt);
                  USERS.save({'name': name, 'username': username, 'password': hash, 'email': email}, function(err, savedUser){
                    if(err)
                      console.log('THERE WAS AN ERROR');
                  });
                  res.redirect('/welcome');
                }
                else
                  res.render('signup', {name: name, userError: "That username is already taken"});
              });
            }
            else
              res.render('signup', {name: name, username: username, emailError: "That's not a valid email address"});
          }
          else
            res.render('signup', {name: name, username: username, verifyPasswordError: "The passwords do not match"}); 
        }
        else
          res.render('signup', {name: name, username: username, pwError: "That's not a valid password"});
      }
      else
        res.render('signup', {name: name, userError: "That's not a valid username"});
    }
    else
        res.render('signup', {username: username, nameError: "That's not a valid name"});
  }
  else
    res.render('signup',{}); 
};
