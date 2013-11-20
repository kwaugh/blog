module.exports = function(req, res){
  console.log("Here");
  console.log("morePosts: " + req.session.morePosts);
  req.session.morePosts += 10;
  POSTS.find().sort({date: -1}, function(err, docs){
    //console.log(docs);
    arr = docs.splice(req.session.morePosts - 1, 10);
    console.log(arr);
    res.json(arr);
  });
};