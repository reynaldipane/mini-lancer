'use strict';
module.exports = (sequelize, DataTypes) => {
  var WorkerService = sequelize.define('WorkerService', {
    WorkerId: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER
  }, {});
  WorkerService.associate = function(models) {
    WorkerService.belongsTo(models.Worker)
    WorkerService.belongsTo(models.Service)
  };
  return WorkerService;
};