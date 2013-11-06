exports.welcome = function(req, res){
  if(req.session.username)
    res.render('welcome', {username: req.session.username});
  else
    res.send('Please login first');
}