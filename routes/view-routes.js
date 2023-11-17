const express = require('express');
const viewsController = require('../controllers/viewController');
const auth = require('../controllers/authController');

const router = express.Router();

// router.use(auth.isLoggedIn);

router.get('/', auth.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', auth.isLoggedIn, viewsController.getTour);
router.get('/login', auth.isLoggedIn, viewsController.getLoginForm);
// router.get('/me', auth.protect, viewsController.getAccount);

// router.post('/submit-user-data', auth.protect, viewsController.updateUserData);

module.exports = router;
