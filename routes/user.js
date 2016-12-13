module.exports = function(req, res){ 
  USERS.findOne({username: req.param('user')}, function(err, doc){
    var name = doc.name;
    
    POSTS.find({username: req.param('user')}).sort({date: -1}, function(err, docs){
    if(docs.length === 0)
        res.render('user', {'name': name, 'docs': {}});
    else
      res.render('user', {'name': name, 'docs': docs});
    });  
  });
  
  
  
  
};
