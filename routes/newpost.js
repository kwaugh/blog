var databaseUrl = 'blog';
var collections = ['posts'];
var db = require('mongojs').connect(databaseUrl, collections);
var d = new Date();

module.exports = function(req,res){
  var subject = req.param('subject');
  var content = req.param('content');
  
  if(req.session.isLoggedIn){
    if(!req.param('subject') && !req.param('content')){
      console.log('Subject: ' + subject + 'Content: ' + content);
      res.render('newpost'); 
    }
    else{
      if(req.param('subject') && req.param('content')){
        if(req.param('subject').length > 40){
          res.render('newpost', {error: 'Please limit your subject to 40 characters'});
          return;
        }
        db.posts.save({'name': req.session.name, 'username': req.session.username, 'subject': subject, 'content': content, 'date': d}, function(err, savedPost){
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
      console.log('in else');
      res.render('newpost', {error: 'Please provide both a subject and content'});
      console.log('Subject: ' + subject + ' Content: ' + content);
    }
  }
  else{
    req.session.unauthorizedAccess = true;
    res.redirect('/login');
  }
};
