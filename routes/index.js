
/*
 * GET home page.
 */
exports.login = require('./login');
exports.newpost = require('./newpost');
exports.welcome = require('./welcome');
exports.signup = require('./signup');
exports.permalink = require('./permalink');
exports.logout = require('./logout');
exports.user = require('./user');


exports.index = function(req, res){
  var databaseUrl = 'blog';
  var collections = ['posts'];
  var db = require('mongojs').connect(databaseUrl, collections);
  var subject = req.param('subject');
  var content = req.param('content');
  var d = new Date();
  
  
  console.log("subject: ", subject, "   content: ", content);
  
  if(req.param('subject') && req.param('content')){
    db.posts.save({'username': req.session.username, 'subject': subject, 'content': content, 'date': d}, function(err, savedPost){
      if(err)
        console.log('ERROR');
      db.posts.findOne({'username': req.session.username, 'subject': subject, 'content': content}, function(err, doc){
        if(err)
          console.log('Error');
        console.log('Document id is ' + doc._id);
        res.redirect('/' + doc._id);
      });
    });
  }
  else{
    db.posts.find().limit(10).sort({date:-1}, function(error, docs){
      res.render('index', {'name': 'Everyone', 'docs': docs});
    });
  }
  
};