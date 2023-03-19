const express = require('express');
const user = require('../controllers/userController')

const router = express.Router();

router
    .route('/')
    .get(user.getAllUsers)
    .post(user.createAUser);

router
    .route('/:id')
    .get(user.getUser)
    .patch(user.updateAUser)
    .delete(user.deleteAUser);

module.exports = router;