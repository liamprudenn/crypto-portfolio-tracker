let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

// Update route imports for cryptocurrency
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let cryptoRouter = require('../routes/crypto');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// MongoDB Connection
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crypto_portfolio', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Use updated routes for the crypto portfolio
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/portfolio', cryptoRouter);  // Using cryptoRouter for portfolio routes

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
