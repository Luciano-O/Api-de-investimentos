'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buyedStocks', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      stockId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stocks',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buyedStocks');
  }
};