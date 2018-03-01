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
    status: DataTypes.INTEGER
  }, {});
  Worker.associate = function(models) {
    Worker.belongsToMany(models.Service, {through : models.WorkerService})
    Worker.hasMany(models.WorkerService)
  };
  return Worker;
};