'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Service.associate = function(models) {
    Service.belongsToMany(models.Worker, {through : models.WorkerService})
    Service.hasMany(models.WorkerService)
    Service.hasMany(models.Transaction)
    Service.belongsToMany(models.Recruiter, {through: models.Transaction})
    Service.belongsToMany(models.Worker, {through: models.Transaction})
  };
  return Service;
};