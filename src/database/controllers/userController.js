const s = require('../services/userService');

const getAll = async (req, res) => {
    const usuarios = await s.getAll();
    res.status(200).json(usuarios);
};

const addUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const data = await s.addUser(displayName, email, password, image);
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&', data);
    if (data.message) return res.status(data.status).json({ message: data.message });
    return res.status(201).json({ token: data });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  addUser,
};