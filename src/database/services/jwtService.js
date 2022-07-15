require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const createToken = (user) => jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

module.exports = { createToken };