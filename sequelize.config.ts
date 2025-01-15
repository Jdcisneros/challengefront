import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  dialect: 'postgres', // Asegúrate de que este campo esté presente
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
};
console.log('DB Host:', process.env.DB_HOST);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);
console.log('DB Name:', process.env.DB_NAME);

export default config