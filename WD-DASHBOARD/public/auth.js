// auth.js

const ADMIN_USERNAME = "aldhi";
const ADMIN_PASSWORD = "kontolkecap"; // sesuai permintaanmu

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    localStorage.setItem("wd_admin_token", "logged_in_ok");
    window.location.href = "dashboard.html";
  } else {
    alert("Username / password salah.");
  }
}

function checkAuth() {
  const token = localStorage.getItem("wd_admin_token");
  if (!token) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("wd_admin_token");
  window.location.href = "login.html";
}
