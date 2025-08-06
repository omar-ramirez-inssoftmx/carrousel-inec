import dotenv from 'dotenv';
import mysql, { Pool, PoolOptions } from 'mysql2/promise';

dotenv.config();

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool: Pool = mysql.createPool(config as PoolOptions);

pool.on('connection', () => {
  console.log('Connected to the database');
});

process.on('uncaughtException', (error: Error) => {
  if (error.message.includes('database') || error.message.includes('mysql')) {
    console.error('Database connection error:', error);
  }
});

export default pool;