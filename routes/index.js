exports.login = require('./login');
exports.newpost = require('./newpost');
exports.welcome = require('./welcome');
exports.signup = require('./signup');
exports.permalink = require('./permalink');
exports.logout = require('./logout');
exports.users = require('./users');
exports.user = require('./user');
exports.manage = require('./manage');
exports.morePosts = require('./morePosts');
exports.feed = require('./feed');


/*
 * GET home page.
 */
exports.index = function(req, res){
  var subject = req.param('subject');
  var content = req.param('content');
  req.session.morePosts = 0;
  
  POSTS.find().limit(10).sort({date:-1}, function(error, docs){
    res.render('index', {'name': 'Everyone', 'docs': docs});
  });
};
