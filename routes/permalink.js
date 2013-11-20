module.exports = function(req, res){
  console.log(req.param('id'));
  POSTS.findOne({'_id':MONGOJS.ObjectId(req.param('id'))}, function(err, doc){
    if(err)
      console.log('Error');
    res.render('permalink', {'doc': doc});
  });
}