// dashboard.js

// Karena API dan UI di domain yang sama (wd-dashboard.vercel.app),
// kita bisa biarkan string kosong → otomatis pakai origin sekarang.
const API_BASE = "";

let allData = [];

function initDashboard() {
  checkAuth();
  loadAll();
  setInterval(loadAll, 10000); // auto refresh tiap 10 detik
}

async function loadAll() {
  await Promise.all([loadStats(), loadTable()]);
}

async function loadStats() {
  try {
    const res = await fetch(`${API_BASE}/api/stats`);
    const json = await res.json();

    document.getElementById("stat-total-wd").textContent = json.total_wd;
    document.getElementById("stat-total-amount").textContent =
      formatRupiah(json.total_amount);
    document.getElementById("stat-total-pending").textContent =
      json.total_pending;
  } catch (e) {
    console.error("Error stats:", e);
  }
}

async function loadTable() {
  const tbody = document.getElementById("wd-list");
  tbody.innerHTML = `<tr><td colspan="8">Loading...</td></tr>`;

  try {
    const res = await fetch(`${API_BASE}/api/list`);
    const data = await res.json();
    allData = data;
    renderTable(data);
  } catch (e) {
    console.error("Error list:", e);
    tbody.innerHTML = `<tr><td colspan="8">Gagal load data</td></tr>`;
  }
}

function renderTable(rows) {
  const tbody = document.getElementById("wd-list");

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">Belum ada data</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => {
      const date = row.created_at
        ? new Date(row.created_at).toLocaleString("id-ID")
        : "-";

      return `
        <tr>
          <td>${row.id}</td>
          <td>${date}</td>
          <td>${escapeHtml(row.username)}</td>
          <td>${escapeHtml(row.name || "")}</td>
          <td>${escapeHtml(row.bank)}</td>
          <td>${formatRupiah(row.amount_numeric || row.amount_raw)}</td>
          <td>${escapeHtml(row.ip || "-")}</td>
          <td>${escapeHtml(row.source || "-")}</td>
        </tr>
      `;
    })
    .join("");
}

function filterTable() {
  const q = document.getElementById("search").value.toLowerCase();
  const filtered = allData.filter((row) => {
    return (
      (row.username && row.username.toLowerCase().includes(q)) ||
      (row.bank && row.bank.toLowerCase().includes(q)) ||
      (row.name && row.name.toLowerCase().includes(q)) ||
      (row.source && row.source.toLowerCase().includes(q))
    );
  });
  renderTable(filtered);
}

function formatRupiah(value) {
  const num = typeof value === "number" ? value : parseFloat(value || 0);
  if (isNaN(num)) return "-";
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
