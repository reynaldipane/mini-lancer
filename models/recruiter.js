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
    // associations can be defined here
  };
  return Recruiter;
};