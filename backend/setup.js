require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// First connect without database to create it if needed
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
});

const dbName = process.env.DB_NAME || 'phone_store';

async function setupDatabase() {
  try {
    // Create database if it doesn't exist
    await connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' ready`);
    
    // Now connect to the specific database
    const db = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName
    });

    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        infoUrl VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database setup completed!');
    db.end();
    connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Setup error:', error);
    connection.end();
    process.exit(1);
  }
}

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    console.log('\nMake sure MySQL is installed and running!');
    console.log('If MySQL is not installed, download it from: https://dev.mysql.com/downloads/mysql/');
    process.exit(1);
  } else {
    console.log('Connected to MySQL server');
    setupDatabase();
  }
});

