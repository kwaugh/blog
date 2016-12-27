var viewCount = {};

module.exports = function(req, res) {
    var id = req.param('id');
    if (!isValidId(id)) {
        res.redirect('/');
    }
    if (viewCount.hasOwnProperty(id)) {
        viewCount[id]++;
        render(viewCount[id], id, req, res);
    } else {
        POSTS.findOne({'_id':MONGOJS.ObjectId(id)}, function(err, doc){
            if (err) {
                res.redirect('/');
                return;
            }
            if (doc.hasOwnProperty('viewCount')) {
                viewCount[id] = doc.viewCount + 1;
            } else {
                viewCount[id] = 1;  
            }
            render(viewCount[id], id, req, res);
        });
    }
};

function render(viewCount, id, req, res) {
    if (viewCount % 10 == 0) {
        POSTS.findAndModify({query: {'_id': MONGOJS.ObjectId(id), username: req.session.username},
            update: {$set: {'viewCount': viewCount}}}, function(){});
    }
    POSTS.findOne({'_id':MONGOJS.ObjectId(id)}, function(err, doc){
        if(err) {
            console.log('Error', err);
        }
        res.render('permalink', {'doc': doc, 'viewCount': viewCount}, function(err, html) {
            html = ALLOW_FORMATTING(html);
            res.send(html);
        });
    });
}

function isValidId(id) {
    var isValid = true;
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (checkForHexRegExp.test(id)) {
        return true;
    } else {
        return false;
    }
}
