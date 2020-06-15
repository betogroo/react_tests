'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.STRING(8)
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        rg: {
          type: Sequelize.INTEGER
        },
        cpf: {
          type: Sequelize.STRING
        },
        birthDate:{
          type: Sequelize.DATEONLY
        },
        gender:{
          type: Sequelize.ENUM('M','F')
        },
        idRole: {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 10,
          references: {
            model: 'Roles',
            key: 'id'
          }/* ,
            onDelete: 'SET DEFAULT',
            onUpdate: 'CASCADE' */
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('Users')
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
};