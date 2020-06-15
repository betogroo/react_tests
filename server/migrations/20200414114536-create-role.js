'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.createTable('Roles', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          unique:true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
    
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('Roles')
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
};
