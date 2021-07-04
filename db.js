require("dotenv").config();
const Pool = new require("pg").Pool;

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: isProduction
});

module.exports = pool;
