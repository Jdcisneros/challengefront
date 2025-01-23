import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Verificar que DATABASE_URL esté definida
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida en las variables de entorno");
}

// Usar DATABASE_URL para la conexión
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Requerido para algunas bases de datos en la nube, como Railway
    },
  },
  logging: false, // Opcional: si no quieres ver las consultas SQL
});

export { sequelize };