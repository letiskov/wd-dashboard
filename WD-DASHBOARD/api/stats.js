// api/stats.js
import pool from "./db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const totalWdQ = await pool.query(
      "SELECT COUNT(*)::int AS total FROM withdraw_logs"
    );
    const totalAmountQ = await pool.query(
      "SELECT COALESCE(SUM(amount_numeric), 0)::float AS total FROM withdraw_logs"
    );

    const total_wd = totalWdQ.rows[0].total;
    const total_amount = totalAmountQ.rows[0].total;

    // sementara: semua dianggap pending
    const total_pending = total_wd;

    return res.status(200).json({
      total_wd,
      total_amount,
      total_pending
    });
  } catch (err) {
    console.error("DB ERROR stats:", err);
    return res.status(500).json({ message: "Error fetching stats" });
  }
}
