import 'dotenv/config';
import { Dialect, Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'XP',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: process.env.DB_DIALECT as Dialect,
};

export = config;
