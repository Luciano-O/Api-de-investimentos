module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'stocks',
      [
        {
          name: 'ABEV3',
          quantity: 99,
          price: 14.57
        },
        {
          name: 'ANIM3',
          quantity: 70,
          price: 4.34
        },
      ], { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stocks', null, {});
  },
};