const express = require('express');
const tour = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tour.checkId);
router.route('/top-5-cheap').get(tour.aliasTopTours, tour.getAllTours);

router.route('/tour-stats').get(tour.getTourStats);

router.route('/monthly-plan/:year').get(tour.getMonthlyPlan);

router.route('/').get(tour.getAllTours).post(tour.createATour);

router
  .route('/:id')
  .get(tour.getATour)
  .patch(tour.updateATour)
  .delete(tour.deleteATour);

module.exports = router;
