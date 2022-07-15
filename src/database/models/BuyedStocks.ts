import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';
import Stocks from './StocksModel';
import Users from './UsersModel';

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
    }
  },
  stockId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Stocks',
      key: 'id'
    }
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'buyedStocks',
  timestamps: false});

export default BuyedStocks;
