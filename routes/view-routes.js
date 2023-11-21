const express = require('express');
const view = require('../controllers/viewController');

const router = express.Router();

router.get('/', view.getOverview);
router.get('/tour/:slug', view.getTour);

module.exports = router;
