import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';
import BuyedStocks from './BuyedStocks';
import Users from './UsersModel';

class Stocks extends Model {
  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
}

Stocks.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(30),
    allowNull: false,
  },
  price: {
    type: DECIMAL(10,2),
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'stocks',
  timestamps: false});

Stocks.belongsToMany(Users, {
  through: BuyedStocks
})

Users.belongsToMany(Stocks, {
  through: BuyedStocks
})

export default Stocks;