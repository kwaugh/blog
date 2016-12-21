var MAX_SUBJECT_LEN = 70;

module.exports = function(req,res) {
    if (!req.session.isLoggedIn) {
        req.session.unauthorizedAccess = true;
        req.session.redirectLoc = '/newpost';
        res.redirect('login');
    }
    var d = new Date();
    var subject = req.param('subject');
    var content = req.param('content');

    if (!validateParams(req, ['subject', 'content'])) {
        res.render('newpost', {error: 'Please provide both a subject and content'});
        return;
    }
    if (req.param('subject').length > MAX_SUBJECT_LEN) {
        res.render('newpost', {error: 'Please limit your subject to ' + MAX_SUBJECT_LEN + ' characters'});
        return;
    }
    POSTS.save(
        {'name': req.session.name, 'username': req.session.username, 'subject': subject,
        'content': content, 'date': d, 'views': 0},
        function(err, savedPost) {
            POSTS.findOne({'username': req.session.username, 'subject': subject, 'content': content},
                function(err, doc) {
                    res.redirect('/' + doc._id);
                }
            );
        }
    );
};

function validateParams(req, paramsList) {
    if (!req.body || req.body === null || req.body == {})
        return false;
    for (var param of paramsList) {
        var current = req.body[param];
        if (current === undefined || current === '')
            return false;
    }
    return true;
}
