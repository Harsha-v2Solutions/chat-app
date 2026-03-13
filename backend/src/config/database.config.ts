import { Sequelize, type Options } from 'sequelize';
import dbConfigData from './db.config.js';
const dbConfig = dbConfigData as Record<string, Options>;

type Environment = 'development' | 'test' | 'production';

const env = (process.env['NODE_ENV'] ?? 'development') as Environment;
const config = dbConfig[env];

if (config === undefined) {
  throw new Error(`Unknown database environment: ${env}`);
}

export const sequelize = new Sequelize(config);
