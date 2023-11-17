const express = require('express');
const tour = require('../controllers/tourController');
const auth = require('../controllers/authController');
const reviewRouter = require('./review-routes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

// router.param('id', tour.checkId);
router.route('/top-5-cheap').get(tour.aliasTopTours, tour.getAllTours);

router.route('/tour-stats').get(tour.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    auth.protect,
    auth.restrictTo('admin', 'lead-guide', 'guide'),
    tour.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tour.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tour.getDistances);

router
  .route('/')
  .get(tour.getAllTours)
  .post(auth.protect, auth.restrictTo('admin', 'lead-guide'), tour.createTour);

router
  .route('/:id')
  .get(tour.getATour)
  .patch(auth.protect, auth.restrictTo('admin', 'lead-guide'), tour.updateTour)
  .delete(
    auth.protect,
    auth.restrictTo('admin', 'lead-guide'),
    tour.deleteTour
  );

module.exports = router;
