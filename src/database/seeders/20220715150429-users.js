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
        {
          name: 'Ana Carolina',
          password: '12345678',
          balance: 27200.30,
        },
        {
          name: 'Hanna Louise',
          password: '12345678',
          balance: 7800.50,
        },
        {
          name: 'Marcus Winnicius',
          password: '12345678',
          balance: 2830.85,
        },
        {
          name: 'Leonardo Morijo',
          password: '12345678',
          balance: 100000.00,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
