'use strict';
module.exports = (sequelize, DataTypes) => {
  var Worker = sequelize.define('Worker', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail:true,
        checkUnique(value,callback) {
          Worker.findOne({
            where : {email: value}
          })
          .then((email) => {
            if(email) {
              callback('Email harus unik !')
            } else {
              callback()
            }
          })
        },
      }
    },
    telp: DataTypes.STRING,
    picture: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {});
  Worker.associate = function(models) {
    Worker.belongsToMany(models.Service, {through : models.WorkerService})
    Worker.hasMany(models.WorkerService)
    Worker.hasMany(models.Transaction)
    Worker.belongsToMany(models.Service, {through: models.Transaction})
    Worker.belongsToMany(models.Recruiter, {through: models.Transaction})
  };
  return Worker;
};