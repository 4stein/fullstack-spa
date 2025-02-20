const Sequelize = require('sequelize');
require('dotenv').config();

const createDatabase = async () => {
  const adminSequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    const databaseName = process.env.DB_NAME || 'spa_database';

    console.log(`Checking if database "${databaseName}" exists...`);

    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`
    );

    if (Array.isArray(results) && results.length === 0) {
      console.log(`Creating database "${databaseName}"...`);
      await adminSequelize.query(`CREATE DATABASE "${databaseName}"`);
      console.log('Database created successfully');
    } else {
      console.log(`Database "${databaseName}" already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await adminSequelize.close();
  }
};

if (require.main === module) {
  createDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = {
  createDatabase,
};
