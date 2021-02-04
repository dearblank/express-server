var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cityRouter = require('./routes/city');
var registerRouter = require('./routes/register');
var menuRouter = require('./routes/menu')

var app = express();

require('./model/connect_mongodb')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/city', cityRouter)
app.use('/register', registerRouter)
app.use('/menu', menuRouter)

module.exports = app;
