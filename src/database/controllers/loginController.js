const s = require('../services/loginServices');

const singIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await s.validarLogin(email, password);
    if (data.message) return res.status(data.status).json({ message: data.message });
    return res.status(200).json({ token: data });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  singIn,
};

// const signIn = async (req, res) => {
//   const { email, password } = s.authenticate.validateBody(req.body);

//   const token = await s.authenticate.validateCredentials({ email, password });

//   res.status(200).json({ token });
// };

// const validateToken = async (req, _res, next) => {
//   const { authorization } = req.headers;
//   const user = s.validateToken(authorization);
//   req.user = user;

//   next();
// };
