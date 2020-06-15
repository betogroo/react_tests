'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('name', value.toUpperCase())
      }
    }
  }, {});
  Role.associate = function (models) {
    this.hasMany(models.User, {
      foreignKey: 'idRole'
    })
  };
  return Role;
};