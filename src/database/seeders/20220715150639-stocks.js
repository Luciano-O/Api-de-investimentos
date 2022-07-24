module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'stocks',
      [
        {
          name: 'ABEV3',
          quantity: 99,
          price: 14.57,
        },
        {
          name: 'ANIM3',
          quantity: 70,
          price: 4.34,
        },
        {
          name: 'BRFS3',
          quantity: 150,
          price: 16.07,
        },
        {
          name: 'SUZB3',
          quantity: 200,
          price: 46.91,
        },
        {
          name: 'RADL3',
          quantity: 250,
          price: 20.03,
        },
        {
          name: 'KLBN11',
          quantity: 100,
          price: 18.90,
        },
        {
          name: 'SBSP3',
          quantity: 150,
          price: 43.55,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stocks', null, {});
  },
};
