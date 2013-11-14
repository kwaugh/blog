module.exports = function(req, res){
  req.session.isLoggedIn = false;
  req.session.justLoggedOut = true;
  res.redirect('/login');
}