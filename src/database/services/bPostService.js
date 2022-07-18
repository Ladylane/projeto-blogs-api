const Sequelize = require('sequelize');
const Joi = require('joi');
const { User, BlogPost, PostCategory, Category } = require('../models/index');
const config = require('../config/config');
// FONTE: https://stackoverflow.com/questions/42656549/joi-validation-of-array
const sequelize = new Sequelize(config.development);

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

const addBPost = async (title, content, categoryIds, data) => {
  const t = await sequelize.transaction();
  try {
    const { error } = schema.validate({ title, content, categoryIds });
    if (error) return { status: 400, message: 'Some required fields are missing' };

    const c = await Category.findOne({ where: { id: categoryIds } });
    if (!c) return { status: 400, message: '"categoryIds" not found' };
    const u = await User.findOne({ where: { email: data } }, { transaction: t });
    const bp = await BlogPost.create(
      { title, content, userId: u.id }, { transaction: t },
);
    const newC = categoryIds.map((e) => ({ postId: bp.dataValues.id, categoryId: e }));
    await PostCategory.bulkCreate(newC, { transaction: t });
    await t.commit();
    return bp;
  } catch (e) {
    await t.rollback();
    console.log(e);
  }
};

module.exports = {
  addBPost,
};
