require('dotenv/config');
const jwt = require('jsonwebtoken');
// const { User } = require('../models/index');

const authenticateToken = async (req, res, next) => {
  // const eOne = { status: 401, message: 'Token not found' };
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findOne({ where: { email: decoded.data.email } });
    // if (!user) {
    //   return res
    //     .status(401)
    //     .json({ message: 'Erro ao procurar usuário do token.' });
    // }
    // req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  authenticateToken,
};

// const authenticateToken = (req, _res, next) => {
//   try {
//     const { authorization } = req.headers;
//     // const eOne = { status: 401, message: 'Token not found' };
//     // const eTwo = { status: 401, message: 'Expired or invalid token' };
//     // if (!authorization) {
//     //   return eOne;
//     // }

//     // const validate = jwt.verify(authorization, process.env.JWT_SECRET);
//     jwt.verify(authorization, process.env.JWT_SECRET);
//     // return validate;
//     next();
//   } catch (e) {
//     // if (e) 
//       console.log(e.message);
//       next(e.message);
//       // return eTwo;
//   }
// };