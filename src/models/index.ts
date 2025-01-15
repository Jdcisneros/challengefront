import { sequelize } from '../config/database';
import User from './User';
import Todo from './Todo';


User.hasMany(Todo, { foreignKey: 'userId', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });


const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

export { sequelize, syncDatabase, User, Todo };