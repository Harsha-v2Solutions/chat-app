import { sequelize } from '../config/database.config';
import User from './User';

// Initialize all models
User.initModel(sequelize);

const models = {
  User,
};

export { sequelize, models, User };
export default models;
