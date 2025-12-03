window.onload=async()=>{
if(localStorage.getItem("session")!=="active"){window.location.href="login.html";return;}
const tb=document.getElementById("table-body");
try{
const r=await fetch("https://wd-api.vercel.app/wd");
const data=await r.json();
tb.innerHTML="";
data.forEach(row=>{
const tr=document.createElement("tr");
const bankFull=`${row.bank} | ${row.rekening} | ${row.nama}`;
const formatCopy=`${row.username} | ${bankFull} | ${row.nominal}`;
tr.innerHTML=`<td>${row.username}</td>
<td>${bankFull}</td>
<td>${row.nominal}</td>
<td><button class="copy-btn" onclick="copyText('${formatCopy}')">Copy</button></td>`;
tb.appendChild(tr);
});
}catch(e){console.log("Error fetch:",e);}
};
function copyText(t){navigator.clipboard.writeText(t);alert("Copied:\n"+t);}
