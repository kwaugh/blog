module.exports = function(req, res) {
    var id = req.param('id');
    if (!isValidId(id)) {
        res.redirect('/');
    }
    POSTS.findOne({'_id':MONGOJS.ObjectId(id)}, function(err, doc){
        if (err) {
            res.redirect('/');
            return;
        }
        res.render('permalink', {'doc': doc}, function(err, html) {
            html = ALLOW_FORMATTING(html);
            res.send(html);
        });
    });
};

function isValidId(id) {
    var isValid = true;
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (checkForHexRegExp.test(id)) {
        return true;
    } else {
        return false;
    }
}
