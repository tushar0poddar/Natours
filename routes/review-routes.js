const express = require('express');
const review = require('../controllers/reviewController');
const auth = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(auth.protect);

router
  .route('/')
  .get(review.getAllReviews)
  .post(auth.restrictTo('user'), review.setTourUserIds, review.createReview);

router
  .route('/:id')
  .get(review.getReview)
  .patch(auth.restrictTo('user', 'admin'), review.updateReview)
  .delete(auth.restrictTo('user', 'admin'), review.deleteReview);

module.exports = router;
