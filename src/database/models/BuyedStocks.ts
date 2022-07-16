import {
  Model, INTEGER,
} from 'sequelize';
import db from '.';

class BuyedStocks extends Model {
  userId!: number;

  stockId!: number;

  quantity!: number;
}

BuyedStocks.init({
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  stockId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Stocks',
      key: 'id',
    },
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'buyedStocks',
  timestamps: false,
});

export default BuyedStocks;
