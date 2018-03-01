'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recruiter = sequelize.define('Recruiter', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail:true,
        checkUnique(value,callback) {
          Recruiter.findOne({
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
    alamat: DataTypes.STRING
  }, {});
  Recruiter.associate = function(models) {
    Recruiter.belongsToMany(models.Service, {through:models.Transaction})
    Recruiter.belongsToMany(models.Worker, {through:models.Transaction})
    Recruiter.hasMany(models.Transaction)
  };
  return Recruiter;
};