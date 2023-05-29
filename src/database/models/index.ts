import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { URL }: string = process.env;

export default new Sequelize(URL);
