const express = require('express');
const bPostController = require('../database/controllers/bPostController');
const mtoken = require('../database/middleware/authToken');
// const val = require('../database/middleware/validacaoBPost');

const router = express.Router();

router.use(mtoken.authenticateToken);
router.post('/', bPostController.addBPost);

module.exports = router;