const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const fileUpload = require('express-fileupload');

const book = require("./routes/book");
const user = require("./routes/user");
const history = require("./routes/history");
const search = require("./routes/search");
const issue = require("./routes/issue");

var app = express();


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: false
  })
);


// ability for application to use json objects
// set size limit to 10mb.
app.use(bodyParser.json({
  limit: '10mb', 
  extended: true
  })
);

app.use(morgan('dev')); //logs all requests to console
app.set('json spaces', 0); // removes spaces from JSON responses 

// set time out to 30 minutes
var TIME_OUT = 1800000
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string',
  cookie: {
    maxAge: TIME_OUT,
  },
  rolling: true,
}));

// Passport middleware
app.use(passport.initialize());
//app.use(passport.session());
// app.use(express.static('public')); //to access the files in public folder
app.use(fileUpload());

// Routes
app.use("/api/book", book);
app.use("/api/user", user);
app.use("/api/history", history);
app.use("/api/search", search);
app.use("/api/issue", issue);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
//===================================================================================

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
