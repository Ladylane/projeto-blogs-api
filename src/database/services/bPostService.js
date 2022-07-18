const Sequelize = require('sequelize');
// const { Op } = require('sequelize');
const Joi = require('joi');
const { User, BlogPost, PostCategory, Category } = require('../models/index');
const config = require('../config/config');
// FONTE: https://stackoverflow.com/questions/42656549/joi-validation-of-array
const sequelize = new Sequelize(config.development);

// const validationBody = async (title, content, userId, categoryIds) => {
const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

// const validate = async (title, content, categoryIds) => {
//   console.log('ENTROU VALIDATE JOI');
//   try {
//     const { error } = schema.validate({ title, content, categoryIds });
//     if (error) return { status: 400, message: 'Some required fields are missing' };

//     const category = await Category.findOne({ where: { id: categoryIds } });
//     if (!category) return { status: 400, message: '"categoryIds" not found' };

//     return value;
//   } catch (e) {
//     console.log(e);
//   }
// };
const addBPost = async (title, content, categoryIds, data) => {
  // console.log('ENTREI FUNCAO ADDBPOST SERVICE  title:', title, ' , content:', content,
  // ' , categoryIds', categoryIds, ' , data', data);
  // validate({ title, content, categoryIds });
  const t = await sequelize.transaction();
  try {
    const { error } = schema.validate({ title, content, categoryIds });
    if (error) return { status: 400, message: 'Some required fields are missing' };
    
    // for (i = 0; i < categoryIds.length; i += 1) {
    //     const category = await Category.findOne({ where: { id: categoryIds[i] } });
    //     if (!category) return { status: 400, message: '"categoryIds" not found' };
    // }

    const c = await Category.findOne({ where: { id: categoryIds } });
    if (!c) return { status: 400, message: '"categoryIds" not found' }; 
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    const u = await User.findOne({ where: { email: data } }, { transaction: t });
    // const u = await User.findOne({
    //   attributes: { exclude: ['displayName', 'email', 'password', 'image'] },
    //   where: { data }, 
    // });
    console.log('UUUUUUUUUUUUUUUUU: ', u);
    const bp = await BlogPost.create(
      { title, content, userId: u.id }, { transaction: t },
);
    console.log('BLOG CREATE:', bp);
    const newC = categoryIds.map((e) => ({ postId: bp.dataValues.id, categoryId: e }));
    await PostCategory.bulkCreate(newC, { transaction: t });
    // await t.commit();
    // await bp.addCategory(categoryIds, { transaction: t }); 
    return bp;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  // validate,
  addBPost,
};

// ----------------------------------
// try {

//   const result = await
//       sequelize.transaction(async (t) => {
//           const bp = await BlogPost.create({title, content}, { transaction: t });

//           for (let i = 0; i < categoryIds.length; i++) {
//               const newCategory =
//                   await Category.create(categoryIds[i], { transaction: t });
//               await CourseModule.create({
//                   idModule: newModule.id,
//                   idCourse: course.id
//               }, { transaction: t })
//           }
//           return true;
//       });
//   console.log(result);
//   return result;
// } catch (e) {

//   console.log(e.message);
// }
//-----------------------------------

// try {
//   validationBody({ title, content, categoryIds });
//   const bp = await BlogPost.create(
//   { title, content },
//   { transaction: t },
//   );
//   await Category.create(
//   { postId: bp.id, categoryId: categoryIds },
//   { transaction: t },
//   );

//   await t.commit();

//   return true;
// } catch (e) {
//   await t.rollback();
//   console.log(e.message);
//   return e;
// }

// -----------------------------------------------------