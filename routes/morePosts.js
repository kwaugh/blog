module.exports = function(req, res){
  console.log("Here");
  console.log("morePosts: " + req.session.morePosts);
  if(req.session.morePosts)
    req.session.morePosts += 10;
  else
    req.session.morePosts = 10;
  POSTS.find().sort({date: -1}, function(err, docs){
    //console.log(docs);
    console.log("morePosts: " + req.session.morePosts);
    arr = docs.splice(req.session.morePosts, 10);
    console.log('length: ' + arr.length);
    console.log(arr);
    if(arr.length === 0){
      console.log("hello");
      res.json({error: 'There are no more posts'});
    }
    else
      res.json(arr);
  });
};