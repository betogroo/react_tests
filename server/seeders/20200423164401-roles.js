'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.bulkInsert('Roles', 
        [
          {
            name: 'Usuário',
            id: 10,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Moderador',
            id: 50,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Super Admin',
            id: 100,
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ], {})
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(e)
    }
  },

  down: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.bulkDelete('Roles', null, {});
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
};
