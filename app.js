const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
const config = require('./webpack.config');
var sampleJson = require('./app/javascripts/actualjson.json')
const cacheEngine = require('./app/javascripts/ContentFetchEngine')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
const webpack = require('webpack');
const compiler = webpack(config);
var app = express();
cacheEngine.getHomeScreenResponse();
// view engine setup
const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    silent: false,
    stats: {color: true}
});

app.set('view engine', 'jade');
app.use(middleware);
app.use(webpackHotMiddleware(compiler));


// uncomment after placing your favicon in /app
//app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './app/www/index.html'));
});

app.get('/homedetail', (req, res) => {
    res.sendFile(path.join(__dirname, './app/www/index.html'));
});
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, './app/www/service-worker.js'));
});

app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, './app/www/manifest.json'));
});

app.get('/homeScreen', (req, res) => {
    res.send(cacheEngine.getHomeScreenResponse());
});

app.get('/newslist', (req, res) => {
    cacheEngine.getHomeScreenResponse(function (item) {
        res.send(item);
    });
});

module.exports = app;
