var databaseUrl = 'blog';
var collections = ['posts'];
var db = require('mongojs').connect(databaseUrl, collections);
var d = new Date();

module.exports = function(req, res){ 
  console.log('name: ' + req.session.name);
  db.posts.find({username: req.param('user')}).limit(10).sort({date:-1}, function(error, docs){
    res.render('user', {'name': req.session.name, 'docs': docs});
  });  
};