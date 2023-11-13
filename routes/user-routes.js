const express = require('express');
const user = require('../controllers/userController');
const auth = require('../controllers/authController');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);

router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);

router.patch('/updateMyPassword', auth.protect, auth.updatePassword);

router.patch('/updateMe', auth.protect, user.updateMe);
router.delete('/deleteMe', auth.protect, user.deleteMe);

router
  .route('/')
  .get(user.getAllUsers)
  .post(user.createAUser)
  .delete(user.deleteAllUser);

router
  .route('/:id')
  .get(user.getUser)
  .patch(user.updateAUser)
  .delete(user.deleteAUser);

module.exports = router;
