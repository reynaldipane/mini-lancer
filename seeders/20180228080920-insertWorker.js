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
      return queryInterface.bulkInsert('Workers',[{
        username: 'andi',
        password: 'andi1234',
        name: 'Andi Saputra',
        email: 'andis@gmail.com',
        telp: '08123456789',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date(),
      },{
        username: 'agungp',
        password: 'agung1234',
        name: 'Agung Prabowo',
        email: 'agung.caproex@gmail.com',
        telp: '087822171172',
        status: 1,
        createdAt:new Date(),
        updatedAt:new Date(),
      }], {})
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
