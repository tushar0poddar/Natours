const express = require('express');
const user = require('../controllers/userController');
const auth = require('../controllers/authController');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);

router.route('/').get(user.getAllUsers).post(user.createAUser);

router
  .route('/:id')
  .get(user.getUser)
  .patch(user.updateAUser)
  .delete(user.deleteAUser);

module.exports = router;
