const express = require('express');
const loginController = require('../database/controllers/loginController');

const router = express.Router();

router.post('/', loginController.singIn);

module.exports = router;