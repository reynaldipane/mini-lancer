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
      return queryInterface.bulkInsert('Services', [{
        name: 'Asisten Rumah Tangga',
        description: 'Asisten / Pembantu Rumah Tangga harian',
        createdAt:new Date(),
        updatedAt:new Date(),
      },{
        name: 'Cleaning Service',
        description: 'Cleaning Service / tukang kebun rumah untuk harian ',
        createdAt:new Date(),
        updatedAt:new Date(),
      },{
        name: 'Security',
        description: 'Security / Satpam rumah untuk harian',
        createdAt:new Date(),
        updatedAt:new Date(),
      },{
        name: 'Baby Sitter',
        description: 'Babi Sitter / pengasuh harian untuk bayi, anak kecil dan lansia',
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
