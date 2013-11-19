var databaseUrl = 'blog';
var collections = ['posts'];
var db = require('mongojs').connect(databaseUrl, collections);

module.exports = function(req, res){
  console.log("Here");
  console.log("morePosts: " + req.session.morePosts);
  req.session.morePosts += 10;
  db.posts.find().limit(10 + req.session.morePosts).sort({date: -1}, function(err, docs){
    console.log(docs);
    res.json(docs.splice(10 + req.session.morePosts));
  });
};