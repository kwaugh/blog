
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var newpost = require('./routes/newpost');
var permalink = require('./routes/permalink');
var signup = require('./routes/signup');
var welcome = require('./routes/welcome');
var login = require('./routes/login');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('topiqac3098aoi8afawfd;kkf98er'));
app.use(express.cookieSession());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', routes.index);
app.all('/newpost', newpost.newpost);
app.all('/signup', signup.signup);
app.get('/welcome', welcome.welcome);
app.get('/:id', permalink.permalink);
app.all('/login', login.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
