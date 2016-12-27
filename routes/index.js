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

var path = require('path');
var appDir = path.dirname(require.main.filename);

/*
 * GET home page.
 */
exports.index = function(req, res){
    res.sendfile('html/index.html', {root: appDir});
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

global.allowFormatting = function(html) {
    // support bolding, italicizing, underlining, and strikethrough text
    html = html.replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>');
    html = html.replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>');
    html = html.replaceAll('&lt;u&gt;', '<u>').replaceAll('&lt;/u&gt;', '</u>');
    html = html.replaceAll('&lt;strike&gt;', '<strike>') .replaceAll('&lt;/strike&gt;', '</strike>');
    return html;
};
