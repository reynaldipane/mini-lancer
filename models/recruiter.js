'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recruiter = sequelize.define('Recruiter', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    telp: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {});
  Recruiter.associate = function(models) {
    // associations can be defined here
  };
  return Recruiter;
};