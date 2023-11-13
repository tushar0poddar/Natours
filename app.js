const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tour-routes');
const userRouter = require('./routes/user-routes');


const app = express();

//1. Global Middleware
//Set security headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit request from same API
const limitter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP address',
});

app.use('/api', limitter);

//Body Parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// 2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const error =new Error(`Can't find ${req.originalUrl} on this server`);
  // error.status = 'fail';
  // error.statusCode = 404;
  const message = `Can't find ${req.originalUrl} on this server`;
  next(new AppError(message, 404));
});

app.use(globalErrorHandler);

module.exports = app;
