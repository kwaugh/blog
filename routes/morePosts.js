module.exports = function(req, res){
    if(req.session.morePosts) {
        req.session.morePosts += 10;
    }
    else {
        req.session.morePosts = 10;
    }
    POSTS.find().sort({date: -1}, function(err, docs){
        var arr = docs.splice(req.session.morePosts, 10);
        console.log('req.session.morePosts:', req.session.morePosts);
        console.log('arr:', arr);
        console.log('arr.length:', arr.length);
        if(arr.length === 0){
            res.json({error: 'There are no more posts'});
        }
        else {
            res.json(arr);
        }
    });
};
