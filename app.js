//Node.js module that loads environment variables from a .env file into process.env
require('dotenv').config()

//Node.js module to create HTTP errors for Express
const createError = require('http-errors');

//Node.js module. Web framework for node
const express = require('express')

//express's bundled to provides utilities for working with file and directory paths
const path = require('path')

//Node.js module. HTTP request logger middleware
const logger = require('morgan')

//Node.js module. HTTP request logger middleware to use req.cookies
const cookieParser = require('cookie-parser');


/**
 * Handlebars, session and Mongoose config
 */
require('./config/hbs.config');
require('./config/db.config');
const session = require('./config/session.config');


/**
 * Configure express
 */
const app = express()

//log the status code to the console (2xx, 4xx, 5xx ecc)
app.use(logger('dev'))

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads
app.use(express.json())

//This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads
//A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body)
app.use(express.urlencoded({ extended: false }));

//Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

//we are going to load our static's files into the public's folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(session)

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  req.currentUser = req.session.user
  next()
})

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Configure routes
 */
const router = require('./config/routes.js');
app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // console.error(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/** 
 * Listen on provided port
 */
const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Helper functions

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}