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
      res.render('index', {'name': 'Everyone', 'docs': docs}, function(err, html) {
          html = allowFormatting(html);
          res.send(html);
      });
  });
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

global.allowFormatting = function(html) {
    // support bolding text
    html = html.replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>');
    // support italicizing text
    html = html.replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>');
    // support underlining text
    html = html.replaceAll('&lt;u&gt;', '<u>').replaceAll('&lt;/u&gt;', '</u>');
    // support strikethrough text
    html = html.replaceAll('&lt;strike&gt;', '<strike>').replaceAll('&lt;/strike&gt;', '</strike>');
    return html;
}
