
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
  var day = d.getDate();
  var year = d.getFullYear();
  var month = d.getMonth();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  var fullDate = hour + ":" + minute + ":" + second + " " + month + "/" + day + "/" + year;
  
  console.log("subject: ", subject, "   content: ", content);
  
  if(req.param('subject') && req.param('content')){
    db.posts.save({'subject': subject, 'content': content, 'date': fullDate}, function(err, savedUser){
      if(err)
        console.log('ERROR');
    })
  }
  res.render('index');
};