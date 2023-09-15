import {
  Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;

  name!: string;

  balance!: number;

  password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: STRING(50),
    allowNull: false,
    unique: true,
  },
  name: {
    type: STRING(30),
    allowNull: false,
  },
  balance: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
