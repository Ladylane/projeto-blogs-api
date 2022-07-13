'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.renameTable('PostsCategories', 'PostCategories');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('PostCategories', 'PostsCategories');
  }
};