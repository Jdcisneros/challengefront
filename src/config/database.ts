import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Usar DATABASE_URL para la conexión
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres', // O 'mysql' si es el caso
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // Esto es necesario para algunas bases de datos en la nube
    }
  },
  logging: false, // Opcional: si no quieres ver las consultas SQL
});

export { sequelize };