const { Category } = require('../models');

const addCat = async (name) => {
  if (!name) {
    const e = { status: 400, message: '"name" is required' };
    return e;
  }
  const data = await Category.create({ name });
  console.log('DATA CREATE: ', data);
  const id = data.null;

  return { id, name };
};

module.exports = {
  addCat,
};