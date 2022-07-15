const express = require('express');
const userController = require('../database/controllers/userController');
const mtoken = require('../database/middleware/authToken');

const router = express.Router();

router.get('/', mtoken.authenticateToken, userController.getAll);
router.post('/', userController.addUser);

module.exports = router;