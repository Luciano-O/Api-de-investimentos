module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'buyedStocks',
      [
        {
          userId: 1,
          stockId: 2,
          quantity: 3,
        },
        {
          userId: 2,
          stockId: 1,
          quantity: 5,
        },
        {
          userId: 2,
          stockId: 4,
          quantity: 10,
        },
        {
          userId: 2,
          stockId: 2,
          quantity: 20,
        },
        {
          userId: 5,
          stockId: 4,
          quantity: 30,
        },
        {
          userId: 4,
          stockId: 3,
          quantity: 15,
        },
        {
          userId: 5,
          stockId: 5,
          quantity: 15,
        },
        {
          userId: 5,
          stockId: 1,
          quantity: 30,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('buyedStocks', null, {});
  },
};
