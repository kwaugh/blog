module.exports = function(req, res) {
    req.session.isLoggedIn = false;
    res.render('login', {message: 'You have been logged out'});
};
