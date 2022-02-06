'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [
      {
        fullName: 'Lailson Gabriel Vieira Cavalcante',
        cpf: '678.363.634-634',
      },
      {
        fullName: 'Yuri Garrido',
        cpf: '356.464.234-04',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', {}, null);
  },
};
