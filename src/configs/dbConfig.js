import { Pool } from 'pg';
import { dotenv } from './envConfig';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function poolDemo() {
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Test connect to DB
(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);
})();

export { pool };