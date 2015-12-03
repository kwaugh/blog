module.exports = function(req, res){
  console.log('updatedPost: ' + req.param('updatedPost'));
  console.log('ObjectID:' + req.param('ObjectId'));
  if(req.param('updatedPost')){
     POSTS.findAndModify({query: {'_id': MONGOJS.ObjectId(req.param('ObjectId')), username: req.session.username}, update: {$set: {'content': req.param('updatedPost')}}}, function(){});
  }
  if(req.param('submit') === ('Delete Post')){
     POSTS.remove({'_id': MONGOJS.ObjectId(req.param('ObjectId'))}, function(err, res){
       console.log(res);
     });
  }
  if(req.session.isLoggedIn){
    POSTS.find({'name': req.session.name}).sort({date:-1}, function(err, docs){
      res.render('manage', {'docs': docs});
    });
  }
  else{
    req.session.unauthorizedAccess = true;
    req.session.redirectLoc = 'manage';
    res.redirect('/login'); 
  }
}
