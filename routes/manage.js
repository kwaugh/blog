module.exports = function(req, res) {
    if (!req.session.isLoggedIn) {
        req.session.unauthorizedAccess = true;
        req.session.redirectLoc = '/manage';
        res.redirect('login');
        return;
    }

    if (req.param('updatedPost')) {
        if (!validateParams(req, ['ObjectId', 'updatedPost', 'subject'])) {
            res.redirect('manage');
            return;
        }
        POSTS.findAndModify(
            {query: {'_id': MONGOJS.ObjectId(req.param('ObjectId')), username: req.session.username},
                update: {$set: {'content': req.param('updatedPost'), 'subject': req.param('subject')}}
            }, function() {}
        );
    }
    if (req.param('submit') === ('Delete')) {
        POSTS.remove({'_id': MONGOJS.ObjectId(req.param('ObjectId'))}, function(err, res){ });
    }
    POSTS.find({'name': req.session.name}).sort({date:-1}, function(err, docs){
        res.render('manage', {'docs': docs});
    });
}

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
