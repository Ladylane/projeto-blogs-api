const express = require('express');
const catController = require('../database/controllers/categoryController');
const mtoken = require('../database/middleware/authToken');

const router = express.Router();

router.post('/categories', mtoken.authenticateToken, catController.addCat);
router.get('/categories', mtoken.authenticateToken, catController.getAll);

module.exports = router;