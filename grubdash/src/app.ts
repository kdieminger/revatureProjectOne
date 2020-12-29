import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './user/user.router';
import restaurantRouter from './restaurant/restaurant.router';
import publicDir from './constant';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicDir));

/*
 Set routers: First argument takes a 'route' string. 
 The route string is the string of characters after our domain name that specifies what resources we are looking for.
 Basically the URN, but more general. (not a full urn, necessarily.)
 The second parameter is a "router". This is an object that will handle a request for me.
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err: any, req: any, res: any, next: Function) {
  // Send error file
  res.status(err.status || 500);
  res.sendFile('/error.html', {root: publicDir});
});

module.exports = app;
