var databaseUrl = 'blog';
var collections= ['posts'];
var mongojs = require('mongojs');
var db = mongojs.connect(databaseUrl, collections);

module.exports = function(req, res){
  console.log(req.param('id'));
  db.posts.findOne({'_id':mongojs.ObjectId(req.param('id'))}, function(err, doc){
    if(err)
      console.log('Error');
    res.render('permalink', {'doc': doc});
  });
}