const { catchAsync } = require('../utils/catchAsync');
const User = require('../models/user-model');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: { users },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No Users right now',
  });
};

exports.createAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No Users right now',
  });
};

exports.updateAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No Users right now',
  });
};

exports.deleteAUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No Users right now',
  });
};
