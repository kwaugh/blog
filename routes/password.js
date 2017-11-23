// handles the master password for the site
module.exports = function(req, res) {
    if (req.session.master_password) {
        res.redirect('/');
        return;
    }
    if(req.param('password')){
        DB.collection('master').findOne({'password': req.param('password')},
            function(err, doc) {
                if (doc) {
                    req.session.master_password = true;
                    res.redirect('/');
                    return;
                } else {
                    res.render('password');
                    return;
                }
            });
        return;
    } else {
        res.render('password');
        return;
    }
};
