/**
 * Module dependencies.
 */
global.MONGOJS = require('mongojs');
global.DB = MONGOJS('blog_mongo_1/blog');
global.POSTS = DB.collection('posts');
global.USERS = DB.collection('users');

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon('public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.cookieParser('topiqac3098aoi8afawfd;kkf98er'));
app.use(express.cookieSession());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// These URLs do not require the blog password to have been entered
const publicPaths = new Set(['/password']);
app.use(function(req, res, next) {
    if (req.method === 'GET'
            && !publicPaths.has(req.url)
            && !req.session.master_password) {
        res.redirect('password');
        return;
    }
    next();
});

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/password', routes.password);
app.all('/newpost', routes.newpost);
app.all('/signup', routes.signup);
app.get('/welcome', routes.welcome);
app.all('/login', routes.login);
app.get('/logout', routes.logout);
app.all('/manage', routes.manage);
app.get('/feed', routes.feed);
app.get('/users', routes.users);
app.get('/users/:user', routes.user);
app.get('/json/morePosts', routes.morePosts);
app.get('/:id', routes.permalink);
app.all('/', routes.index);

http.createServer(app).listen(app.get('port'), function(req, res) {
  console.log('Express http server listening on port ' + app.get('port'));
});
