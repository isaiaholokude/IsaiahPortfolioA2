var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

// All page routes live in controllers/index.js
var indexRouter = require('./controllers/index');

var app = express();

// view engine setup (EJS, generated with express-generator --view=ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Shared layout template: views/layout.ejs wraps every page
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Static assets: /stylesheets, /javascripts, /images are served from /public
app.use(express.static(path.join(__dirname, 'public')));

// Make the current path available to every view (used to highlight the active nav link)
app.use(function (req, res, next) {
  res.locals.currentPath = req.path;
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
