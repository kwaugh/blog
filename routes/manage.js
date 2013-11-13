var databaseUrl = 'blog';
var collections= ['posts'];
var mongojs = require('mongojs');
var db = mongojs.connect(databaseUrl, collections);

module.exports = function(req, res){
  console.log('updatedPost: ' + req.param('updatedPost'));
  console.log('ObjectID:' + req.param('ObjectId'));
  if(req.param('updatedPost')){
     db.posts.findAndModify({query: {'_id': mongojs.ObjectId(req.param('ObjectId'))}, update: {$set: {'content': req.param('updatedPost')}}}, function(){});
  }
  if(req.session.isLoggedIn){
    db.posts.find({'name': req.session.name}, function(err, docs){
      res.render('manage', {'docs': docs});
    });
  }
  else{
   res.send('Please <a href="/login">login</a> first'); 
  }
}