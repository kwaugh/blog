module.exports = function(req, res){
  console.log("Here");
  console.log("morePosts: " + req.session.morePosts);
  req.session.morePosts += 10;
  POSTS.find().limit(10 + req.session.morePosts).sort({date: -1}, function(err, docs){
    docs.splice(10 + req.session.morePosts);
    console.log(docs);
    res.json(docs);
  });
};