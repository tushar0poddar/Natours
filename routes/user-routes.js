const express = require('express');
const user = require('../controllers/userController');
const auth = require('../controllers/authController');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);

//Protect all the routes after this point
router.use(auth.protect);

router.patch('/updateMyPassword', auth.updatePassword);
router.get('/me', user.getMe, user.getUser);
router.patch('/updateMe', user.updateMe);
router.delete('/deleteMe', user.deleteMe);

//Admin Control
router.use(auth.restrictTo('admin'));

router.route('/').get(user.getAllUsers).post(user.createAUser);

router
  .route('/:id')
  .get(user.getUser)
  .patch(user.updateUser)
  .delete(user.deleteUser);

module.exports = router;
