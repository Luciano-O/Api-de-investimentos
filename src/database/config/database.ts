import 'dotenv/config';
import path from 'path';
import { Options } from 'sequelize';

const databasePath = path.join(__dirname, '..', 'database.sqlite');

const config: Options = {
  storage: databasePath,
  dialect: 'sqlite',
};

export = config;
