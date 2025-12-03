// api/list.js
import pool from "./db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const result = await pool.query(
      `
      SELECT id, created_at, username, name, bank, amount_raw, amount_numeric, ip, source
      FROM withdraw_logs
      ORDER BY id DESC
      LIMIT 500
    `
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("DB ERROR list:", err);
    return res.status(500).json({ message: "Error fetching data" });
  }
}
