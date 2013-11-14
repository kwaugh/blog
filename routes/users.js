var databaseUrl = 'blog';
var collections= ['users'];
var mongojs = require('mongojs');
var db = mongojs.connect(databaseUrl, collections);

module.exports = function(req, res){
  db.users.find(function(err, docs){
    res.render('users', {'docs': docs});
  });
}