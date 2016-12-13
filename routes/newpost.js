var MAX_SUBJECT_LEN = 70;

module.exports = function(req,res){
  var d = new Date();
  var subject = req.param('subject');
  var content = req.param('content');
  
  if(req.session.isLoggedIn){
    if(!req.param('subject') && !req.param('content')){
      res.render('newpost'); 
    }
    else{
      if(req.param('subject') && req.param('content')){
        if(req.param('subject').length > MAX_SUBJECT_LEN){
          res.render('newpost', {error: 'Please limit your subject to ' + MAX_SUBJECT_LEN + ' characters'});
          return;
        }
        POSTS.save({'name': req.session.name, 'username': req.session.username, 'subject': subject,
            'content': content, 'date': d, 'views': 0}, function(err, savedPost){
          if(err)
            console.log('ERROR:', err);
          POSTS.findOne({'username': req.session.username, 'subject': subject, 'content': content}, function(err, doc){
            if(err)
              console.log('Error:', err);
            res.redirect('/' + doc._id);
          });
        });
      }
      else{
        res.render('newpost', {error: 'Please provide both a subject and content'});
      }
    }
  }
  else{
    req.session.unauthorizedAccess = true;
    req.session.redirectLoc = '/newpost';
    res.redirect('/login');
  }
};
