// api/db.js
import { Pool } from "pg";

// DATABASE_URL kamu di-set dari Neon di Environment Variables Vercel
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;
