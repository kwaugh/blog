module.exports = function(req, res){
  if(req.param('updatedPost')){
     POSTS.findAndModify({query: {'_id': MONGOJS.ObjectId(req.param('ObjectId')), username: req.session.username}, update: {$set: {'content': req.param('updatedPost'), 'subject': req.param('subject')}}}, function(){});
  }
  if(req.param('submit') === ('Delete')){
     console.log('deleting post');
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
