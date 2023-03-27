const express = require('express');
const tour = require('../controllers/tourController')

const router = express.Router();

// router.param('id', tour.checkId);

router
    .route('/')
    .get(tour.getAllTours)
    .post(tour.createATour);

router
    .route('/:id')
    .get(tour.getATour)
    .patch(tour.updateATour)
    .delete(tour.deleteATour);

module.exports = router;