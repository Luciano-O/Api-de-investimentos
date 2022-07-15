import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Stocks extends Model {
  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
  static associate(models: any) {
    Stocks.belongsToMany(models.Users, {
      through: 'buyedStocks'
    })
  }
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

export default Stocks;