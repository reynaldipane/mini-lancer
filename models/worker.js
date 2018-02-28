'use strict';
module.exports = (sequelize, DataTypes) => {
  var Worker = sequelize.define('Worker', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    telp: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Worker.associate = function(models) {
    // associations can be defined here
  };
  return Worker;
};