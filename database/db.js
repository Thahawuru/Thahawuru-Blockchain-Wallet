const { Pool } = require('pg');
const parse = require('pg-connection-string').parse;
require('dotenv').config(); // Load environment variables

// Parse the connection string
const dbConfig = process.env.DATASOURCE_URL
  ? parse(`postgresql:${process.env.DATASOURCE_URL}`) // Add protocol prefix
  : {
      user: process.env.DATABASE_USERNAME,
      host: 'localhost',
      database: process.env.POSTGRE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
      port: 5432,
    };

// PostgreSQL connection settings
const pool = new Pool({
  user: dbConfig.user || process.env.DATABASE_USERNAME,
  host: dbConfig.host || 'localhost',
  database: dbConfig.database || process.env.POSTGRE_DATABASE,
  password: dbConfig.password || process.env.DATABASE_PASSWORD,
  port: dbConfig.port || 5432,
});

// Function to check the connection
const connectToDatabase = async () => {
  try {
    await pool.query('SELECT 1'); // Simple query to test connection
    console.log('Connected to PostgreSQL database!');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error.message);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  pool,
};
