
/*
 * GET home page.
 */
exports.login = require('./login');
exports.newpost = require('./newpost');
exports.welcome = require('./welcome');
exports.signup = require('./signup');
exports.permalink = require('./permalink');
exports.logout = require('./logout');
exports.users = require('./users');
exports.user = require('./user');
exports.manage = require('./manage');

var databaseUrl = 'blog';
var collections = ['posts'];
var db = require('mongojs').connect(databaseUrl, collections);

exports.index = function(req, res){
  var subject = req.param('subject');
  var content = req.param('content');
  
  console.log("subject: ", subject, "   content: ", content);
  
  db.posts.find().limit(10).sort({date:-1}, function(error, docs){
    res.render('index', {'name': 'Everyone', 'docs': docs});
  });
};