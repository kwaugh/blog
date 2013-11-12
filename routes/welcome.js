module.exports = function(req, res){
  if(req.session.isLoggedIn)
    res.render('welcome', {name: req.session.name});
  else
    res.send('Please <a href="/login">login</a> first');
};