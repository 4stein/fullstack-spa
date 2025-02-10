require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'spa_database',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
  },
};
