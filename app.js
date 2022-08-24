var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teacherRouter = require('./routes/teacher');
var studentRouter = require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://amahovac1:ahmedoni123@cluster0.8mk1e6d.mongodb.net/EIspitWebApp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection; // konekcija na bazu
db.on('connected', function () {
  console.log('sve ok, imam konekciju na bazu');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// kreiranje modela, samo jednom se kreira jer je const logicno, najbolje je to uradit ovdje

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
