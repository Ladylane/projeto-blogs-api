const express = require('express');
const userController = require('../database/controllers/userController');
const mtoken = require('../database/middleware/authToken');

const router = express.Router();

router.post('/user', userController.addUser);
router.get('/user', mtoken.authenticateToken, userController.getAll);
router.get('/user/:id', mtoken.authenticateToken, userController.getById);

module.exports = router;