module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'buyedStocks',
      [
        {
          userId: 1,
          stockId: 2,
          quantity: 3
        },
        {
          userId: 2,
          stockId: 1,
          quantity: 5
        },
      ], { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('buyedStocks', null, {});
  },
};