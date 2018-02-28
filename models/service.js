'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};