const Joi = require('joi');
// const bcrypt = require('bcrypt-nodejs');
const { User } = require('../models/index');
const jwtService = require('./jwtService');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const getAll = async () => {
  const usuarios = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return usuarios;
};

// const eT = { status: 400, message: '"email" must be a valid email' };
// const eThree = { status: 400, message: '"password" length must be at least 6 characters long' };
// const eOne = { status: 400, message: 'Some required fields are missing' };
const eTwo = { status: 409, message: 'User already registered' };
const addUser = async (displayName, email, password, image) => {
  try {
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', displayName, email, password, image);
    // const ver = schema.validate({ displayName, email, password, image });
    // console.log('VER RETORNO DO JOY : ', ver);
    const { error } = schema.validate({ displayName, email, password, image });
    // console.log('!!!!!ERROR SERVICE JOI: ', error);
    if (error) {
      const e = { status: 400, message: error.details[0].message };
      return e;
    }

    const user = await User.findOne({ where: { email } });
    if (user) return eTwo;

    await User.create({ displayName, email, password, image });

    const token = jwtService.createToken(email);
    return token;
  } catch (e) {
    console.log(e.message);
  }
  // const salt = bcrypt.genSaltSync(5);
  // const passwordHash = bcrypt.hashSync(password, salt);
};

module.exports = { 
  getAll,
  addUser,
};