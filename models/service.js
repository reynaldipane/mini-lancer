'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Service.associate = function(models) {
    Service.belongsToMany(models.Worker, {through : models.WorkerService})
    Service.hasMany(models.WorkerService)
  };
  return Service;
};