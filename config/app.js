var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
let compress = require('compression');
let cors = require('cors');

var indexRouter = require('../routes/index');
var firebaseAuthRouter = require('../routes/firebaseAuth');
var inventoryRouter = require('../routes/inventory');

var errorHandler = require('./error-handler');

var app = express();

// Enable cors
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', firebaseAuthRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler.errorHandlerMiddleware)
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);

//   const errorResponse = {
// 		sucess: false,
// 		message: err.message
// 	};

//   res.json(errorResponse);
// });

module.exports = app;
