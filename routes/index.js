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
global.APP_DIR = path.dirname(require.main.filename);

/*
 * GET home page.
 */
exports.index = function(req, res){
    if (typeof INDEX_HTML !== 'undefined' && INDEX_HTML !== '') {
        res.send(INDEX_HTML);
    } else {
        res.sendfile('html/index.html', {root: APP_DIR});
    }
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

global.ALLOW_FORMATTING = function(html) {
    // support bolding, italicizing, underlining, and strikethrough text
    html = html.replaceAll('&lt;b&gt;', '<b>').replaceAll('&lt;/b&gt;', '</b>');
    html = html.replaceAll('&lt;i&gt;', '<i>').replaceAll('&lt;/i&gt;', '</i>');
    html = html.replaceAll('&lt;u&gt;', '<u>').replaceAll('&lt;/u&gt;', '</u>');
    html = html.replaceAll('&lt;strike&gt;', '<strike>') .replaceAll('&lt;/strike&gt;', '</strike>');
    return html;
};

global.RERENDER_INDEX = function(res) {
    POSTS.find().limit(10).sort({date:-1}, function(error, docs){
        res.render('index', {'name': 'Everyone', 'docs': docs}, function(err, html) {
            html = ALLOW_FORMATTING(html);
            global.INDEX_HTML = html;
            var fs = require('fs');
            fs.writeFile(APP_DIR + '/html/index.html', html, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        });
    });
};
