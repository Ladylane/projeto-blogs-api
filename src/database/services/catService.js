const { Category } = require('../models');

const getAll = async () => {
  const infos = await Category.findAll();
  console.log('INFOS SERVICE: ', infos);
  return infos;
};

const addCat = async (name) => {
  if (!name) {
    const e = { status: 400, message: '"name" is required' };
    return e;
  }
  const data = await Category.create({ name });
  // console.log('DATA CREATE: ', data);
  const id = data.null;

  return { id, name };
};

module.exports = {
  getAll,
  addCat,
};