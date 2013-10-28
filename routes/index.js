
/*
 * GET home page.
 */

exports.index = function(req, res){
  var databaseUrl = 'blog';
  var collections= ['posts'];
  var db = require('mongojs').connect(databaseUrl, collections);
  var subject = req.param('subject');
  var content = req.param('content');
  var d = new Date();
  
  
  console.log("subject: ", subject, "   content: ", content);
  
  if(req.param('subject') && req.param('content')){
    db.posts.save({'subject': subject, 'content': content, 'date': d}, function(err, savedUser){
      if(err)
        console.log('ERROR');
    })
  }
  db.posts.find().limit(10).sort({date:-1}, function(error, docs){
    res.render('index', {'docs': docs});
  });
  
};