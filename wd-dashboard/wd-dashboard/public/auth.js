function login(){
const u=document.getElementById("username").value;
const p=document.getElementById("password").value;
if(u==="aldhi"&&p==="kontolkecap"){
localStorage.setItem("session","active");
window.location.href="dashboard.html";
}else{document.getElementById("login-error").innerText="Incorrect login.";}
}
function logout(){localStorage.removeItem("session");window.location.href="login.html";}
