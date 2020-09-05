var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
const dotenv = require('dotenv');
var mongoose = require('mongoose');
var unless = require('express-unless');

dotenv.config({path: '.env'});

var profileRouter = require('./routes/profiles');
var loginRouter = require('./routes/login');
var auth = require('./middleware/auth-middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//Auth Middleware
app.use(unless(auth, {path: ['/login', '/register']}));

app.use('/', profileRouter);
app.use('/', loginRouter);

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

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    console.log('conected to mongdb'),
    app.listen(process.env.PORT, () =>{
      console.log('running on '+ process.env.PORT)
    }),
).catch(error =>{
  console.log('mongodb error', error)
});

module.exports = app;
