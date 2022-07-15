const express = require('express');
const userController = require('../database/controllers/userController');
const mtoken = require('../database/middleware/authToken');

const router = express.Router();

router.post('/', userController.addUser);
router.use(mtoken.authenticateToken);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

module.exports = router;