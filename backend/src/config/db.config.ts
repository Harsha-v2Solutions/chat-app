import 'dotenv/config';

interface DbConfig {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging?: boolean;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const baseConfig = {
  dialect: 'postgres' as const,
  host: process.env['DB_HOST'] ?? 'localhost',
  port: Number(process.env['DB_PORT'] ?? 5432),
  username: process.env['DB_USER'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? '',
};

const config: Record<string, DbConfig> = {
  development: {
    ...baseConfig,
    database: process.env['DB_NAME'] ?? 'app_development',
  },
  test: {
    ...baseConfig,
    database: process.env['DB_NAME'] ?? 'app_test',
  },
  production: {
    ...baseConfig,
    dialect: process.env['DB_DIALECT'] ?? 'postgres',
    database: process.env['DB_NAME'] ?? '',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
