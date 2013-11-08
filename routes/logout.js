module.exports = function(req, res){
  req.session.isLoggedIn = false;
  res.redirect('/login');
}