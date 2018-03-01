'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Recruiters',[{
        username: 'reynaldi',
        password: 'pane1234',
        name: 'Reynaldi S. Pane',
        email: 'reynaldi@gmail.com',
        telp: '08123456789',
        alamat: 'Bandung',
        createdAt:new Date(),
        updatedAt:new Date(),
      },{
        username: 'ekif',
        password: 'ekif1234',
        name: 'Eki Fakhrureza',
        email: 'ekif@gmail.com',
        telp: '08123456789',
        alamat: 'Bandung',
        createdAt:new Date(),
        updatedAt:new Date(),
      }],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
