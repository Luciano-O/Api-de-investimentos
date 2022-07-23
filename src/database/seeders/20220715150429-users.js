module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Luciano Oliveira',
          password: 'lucki123',
          balance: 250.50,
        },
        {
          name: 'Adevani Nascimento',
          password: 'xablau123',
          balance: 1550.30,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
