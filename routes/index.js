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
var fs = require('fs');
global.APP_DIR = path.dirname(require.main.filename);
global.INDEX_HTML = '';

/*
 * GET home page.
 */
exports.index = function(req, res){
    req.session.morePosts = 0;
    if (typeof INDEX_HTML !== 'undefined' && INDEX_HTML !== '') {
        res.send(INDEX_HTML);
    } else {
        res.sendfile('html/index.html', {root: APP_DIR});
        fs.readFile(APP_DIR + '/html/index.html', 'utf8', function(err, html) {
            INDEX_HTML = html;
        });
    }
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'gi'), replacement);
};

global.ALLOW_FORMATTING = function(html) {
    // support bolding, italicizing, underlining, strikethrough text, and hyperlinks
    html = html.replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>');
    html = html.replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>');
    html = html.replaceAll('&lt;u&gt;', '<u>').replaceAll('&lt;/u&gt;', '</u>');
    html = html.replaceAll('&lt;strike&gt;', '<strike>') .replaceAll('&lt;/strike&gt;', '</strike>');
    html = html.replaceAll('&lt;link&gt;(.*)&lt;\/link&gt;', '<u><a href="$1">$1</a></u>');
    return html;
};

global.RERENDER_INDEX = function(res) {
    POSTS.find().limit(10).sort({date:-1}, function(error, docs){
        res.render('index', {'name': 'Everyone', 'docs': docs}, function(err, html) {
            html = ALLOW_FORMATTING(html);
            INDEX_HTML = html;
            var fs = require('fs');
            fs.writeFile(APP_DIR + '/html/index.html', html, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        });
    });
};
