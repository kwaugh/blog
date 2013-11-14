module.exports = function(req, res){ 
  var databaseUrl = 'blog';
  var collections= ['users'];
  var mongojs = require('mongojs');
  var db = mongojs.connect(databaseUrl, collections);
  
  db.users.findOne({username: req.param('user')}, function(err, doc){
    console.log('doc: ' + doc);
    console.log('NAME: ' + doc.name);
    var name = doc.name;
    
    collections = ['posts'];
    db = mongojs.connect(databaseUrl, collections);
    db.posts.find({username: req.param('user')}).sort({date: -1}, function(err, docs){
    if(docs.length === 0)
        res.render('user', {'name': name, 'docs': {}});
    else
      res.render('user', {'name': name, 'docs': docs});
    });  
  });
  
  
  
  
};