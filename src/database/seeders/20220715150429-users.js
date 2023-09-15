module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Luciano Oliveira',
          email: 'oliveiraluck78@gmail.com',
          password: 'lucki123',
          balance: 250.5,
        },
        {
          name: 'Adevani Nascimento',
          email: 'oliveiraluck778@gmail.com',
          password: 'xablau123',
          balance: 1550.3,
        },
        {
          name: 'Ana Carolina',
          email: 'Carolina_gatinha2001@gmail.com',
          password: '12345678',
          balance: 27200.3,
        },
        {
          name: 'Hanna Louise',
          email: 'hanna109@gmail.com',
          password: '12345678',
          balance: 7800.5,
        },
        {
          name: 'Marcus Winnicius',
          email: 'marcussaopaulooo@gmail.com',
          password: '12345678',
          balance: 2830.85,
        },
        {
          name: 'Leonardo Morijo',
          email: 'leomorijo@gmail.com',
          password: '12345678',
          balance: 100000.0,
        },
      ],
      // eslint-disable-next-line comma-dangle
      { timestamps: false }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
