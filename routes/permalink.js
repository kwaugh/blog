var viewCount = {};

module.exports = function(req, res) {
    var id = req.param('id');
    console.log(id);
    if (viewCount.hasOwnProperty(id)) {
        viewCount[id]++;
        render(viewCount[id], id, req, res);
    } else {
        POSTS.findOne({'_id':MONGOJS.ObjectId(id)}, function(err, doc){
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
        console.log('viewCount:', viewCount);
        POSTS.findAndModify({query: {'_id': MONGOJS.ObjectId(id), username: req.session.username},
            update: {$set: {'viewCount': viewCount}}}, function(){});
    }
    POSTS.findOne({'_id':MONGOJS.ObjectId(id)}, function(err, doc){
        if(err) {
            console.log('Error');
        }
        res.render('permalink', {'doc': doc});
    });
}
