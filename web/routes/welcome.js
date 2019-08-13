module.exports = function(req, res) {
    if (req.session.isLoggedIn) {
        res.render('welcome', {name: req.session.name});
        return;
    } else {
        res.redirect('login');
        return;
    }
};
