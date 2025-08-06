import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);

pool.on('connection', () => {
  console.log('Connected to the database');
});

process.on('uncaughtException', (error: Error) => {
  if (error.message.includes('database') || error.message.includes('mysql')) {
    console.error('Database connection error:', error);
  }
});

export default pool;