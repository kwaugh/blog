module.exports = function(req, res){
  if(req.session.isLoggedIn)
    res.render('welcome', {username: req.session.username});
  else
    res.send('Please <a href="/login">login</a> first');
};