'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    WorkerId: DataTypes.INTEGER,
    RecruiterId: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER,
    status : DataTypes.STRING,
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Service)
    Transaction.belongsTo(models.Worker)
    Transaction.belongsTo(models.Recruiter)
  };
  return Transaction;
};