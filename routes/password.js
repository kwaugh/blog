// handles the master password for the site

var crypto = require('crypto');

module.exports = function(req, res) {
    if (req.session.master_password) {
        res.redirect('/');
        return;
    }
    if(req.param('password')){
        var hash = crypto.createHash('sha256').update(req.param('password')).digest('hex')
        DB.collection('master').findOne({'password': hash},
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
