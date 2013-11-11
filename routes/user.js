var databaseUrl = 'blog';
var collections = ['posts'];
var db = require('mongojs').connect(databaseUrl, collections);
var d = new Date();

module.exports = function(req, res){ 
  db.posts.find({username: req.param('user')}).limit(10).sort({date:-1}, function(error, docs){
    res.render('index', {'user': req.param('user'), 'docs': docs});
  });  
};