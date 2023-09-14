import 'dotenv/config';
import path from 'path';
import { Sequelize } from 'sequelize';

const sqliteStoragePath = path.join(__dirname, '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: sqliteStoragePath,
});

export default sequelize;
