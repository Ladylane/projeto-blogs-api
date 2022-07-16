const express = require('express');
const catController = require('../database/controllers/categoryController');
const mtoken = require('../database/middleware/authToken');

const router = express.Router();

router.use(mtoken.authenticateToken);
router.post('/', catController.addCat);

module.exports = router;