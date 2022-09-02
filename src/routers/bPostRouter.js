const express = require('express');
const bPostController = require('../database/controllers/bPostController');
const mtoken = require('../database/middleware/authToken');

const router = express.Router();

router.post('/post', mtoken.authenticateToken, bPostController.addBPost);

module.exports = router;