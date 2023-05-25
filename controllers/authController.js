const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const signedToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  });

  const token = signedToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Checking if the user is giving email and password or not
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  //Check if the user exist and  password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  //Sending the token to the client if everything is OK!
  const token = signedToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.accessTours = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in! Please first login to get access',
        401
      )
    );
  }

  //2) Verifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3  check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belongs to this token does no longer exist', 401)
    );
  }

  //4 Check if user changed password after the token was issued
  freshUser.checkPasswordChanged(decoded.iat);

  next();
});
