import 'dotenv/config';
import { z } from 'zod';
import { Sequelize } from 'sequelize';

const urlVerify = z.string();

const DB_URL: string = urlVerify.parse(process.env.URL);

export default new Sequelize(DB_URL);
