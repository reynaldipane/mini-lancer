'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    hooks:{
      afterDestroy: (instance) => {
        sequelize.models.WorkerService.destroy({
          where: {
            ServiceId: instance.id
          }
        })
      }
    }
  });
  Service.associate = function(models) {
    Service.belongsToMany(models.Worker, {through : models.WorkerService})
    Service.hasMany(models.WorkerService)
    Service.hasMany(models.Transaction)
    Service.belongsToMany(models.Recruiter, {through: models.Transaction})
    Service.belongsToMany(models.Worker, {through: models.Transaction})
  };
  return Service;
};