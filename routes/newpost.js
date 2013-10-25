exports.newpost = function(req,res){
  if(!req.param('subject') && !req.param('content')){
    console.log('Subject: ' + req.param('subject') + 'Content: ' + req.param('content'));
    res.render('newpost'); 
  }
  else{
    console.log('in else');
    res.render('newpost', {error: 'Please provide both a subject and content'});
    console.log('Subject: ' + req.param('subject') + ' Content: ' + req.param('content'));
  }
};