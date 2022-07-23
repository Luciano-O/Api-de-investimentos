module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('stocks');
  },
};
