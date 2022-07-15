require('dotenv/config');
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, _res) => {
  const token = req.headers.authorization;
  const eOne = { status: 401, message: 'Token not found' };
  const eTwo = { status: 401, message: 'Expired or invalid token' };
  if (!token) {
      throw eOne;
  }

  try {
      const validate = await jwt.verify(token, process.env.JWT_SECRET);
      return validate;
  } catch (error) {
      console.log(error);
      throw eTwo;
  }
};

module.exports = {
  authenticateToken,
};