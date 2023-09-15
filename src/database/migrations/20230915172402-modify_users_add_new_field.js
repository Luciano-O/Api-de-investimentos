module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'd@gmail.com',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'email');
  },
};
