/* =====================================
   SAGAR CONSTRUCTION V2
   STYLE.CSS (PART 2B)
===================================== */

.payment-summary{
    margin-top:30px;
    padding:20px;
    background:#f8f8f8;
    border-radius:10px;
    border:1px solid #ddd;
}

.payment-summary h2{
    text-align:center;
    color:#0b6b36;
    margin-bottom:20px;
}

.summary-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:15px;
}

.summary-box{
    background:white;
    border:2px solid #0b6b36;
    border-radius:10px;
    padding:15px;
    text-align:center;
}

.summary-box label{
    display:block;
    font-size:14px;
    color:#555;
    margin-bottom:8px;
}

.summary-box h3{
    color:#0b6b36;
    font-size:24px;
    font-weight:bold;
}

.action-buttons{
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:12px;
    margin:30px 0;
}

.action-buttons button{
    min-width:170px;
}

.print-footer{
    margin-top:60px;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
}

.left-sign,
.right-sign{
    text-align:center;
    width:220px;
    font-weight:600;
}

.version{
    text-align:center;
    color:#888;
    margin-top:25px;
    font-size:13px;
}

footer{
    margin-top:25px;
    text-align:center;
    color:#666;
    font-size:14px;
}

/* =====================
   MOBILE
===================== */

@media(max-width:768px){

.container{
    width:100%;
    margin:0;
    border-radius:0;
    padding:12px;
}

header h1{
    font-size:24px;
}

.summary{
    grid-template-columns:1fr;
}

.top-bar{
    flex-direction:column;
    align-items:stretch;
}

.right{
    width:100%;
}

.right button,
.action-buttons button,
.search-box button{
    width:100%;
}

.search-box{
    flex-direction:column;
}

.summary-grid{
    grid-template-columns:1fr;
}

.print-footer{
    flex-direction:column;
    gap:40px;
    align-items:center;
}

}

/* =====================
   PRINT MODE
===================== */

@media print{

body{
    background:white;
}

.container{
    box-shadow:none;
    border:none;
    width:100%;
}

button{
    display:none;
}

.search-box{
    display:none;
}

.top-bar .right{
    display:none;
}

.action-buttons{
    display:none;
}

.version{
    display:none;
}

input{
    border:none !important;
}

table{
    font-size:11px;
}

table th{
    background:#eee !important;
    color:black !important;
}

}
// =========================================
// PART 3B
// =========================================

// --------- CALCULATE ----------

function calculate(){

let grandTotal=0;
let totalPresent=0;
let totalAdvance=0;

document.querySelectorAll("#tableBody tr").forEach(row=>{

let wage=parseFloat(row.querySelector(".dailyWage").value)||0;

let advance=parseFloat(row.querySelector(".advance").value)||0;

let present=0;

row.querySelectorAll(".day").forEach(box=>{

if(box.checked) present++;

});

let salary=present*wage;

let balance=salary-advance;

row.querySelector(".presentDays").innerText=present;

row.querySelector(".totalSalary").innerText=salary;

row.querySelector(".balance").innerText=balance;

grandTotal+=balance;
totalPresent+=present;
totalAdvance+=advance;

});

document.getElementById("grandTotal").innerText=grandTotal;

document.getElementById("summaryWorkers").innerText=
document.querySelectorAll("#tableBody tr").length;

document.getElementById("summaryPresent").innerText=totalPresent;

document.getElementById("summarySalary").innerText=grandTotal+totalAdvance;

document.getElementById("summaryAdvance").innerText=totalAdvance;

document.getElementById("summaryBalance").innerText=grandTotal;

document.getElementById("workerCount").innerText=
document.querySelectorAll("#tableBody tr").length;

document.getElementById("totalPresent").innerText=totalPresent;

saveData();

}

// ---------- ADD WORKER ----------

document.getElementById("addWorker").onclick=function(){

let no=document.querySelectorAll("#tableBody tr").length+1;

let row=document.createElement("tr");

row.innerHTML=`

<td>${no}</td>

<td><input type="text" class="workerName"></td>

<td><input type="number" class="dailyWage" value="0"></td>

<td><input type="checkbox" class="day"></td>
<td><input type="checkbox" class="day"></td>
<td><input type="checkbox" class="day"></td>
<td><input type="checkbox" class="day"></td>
<td><input type="checkbox" class="day"></td>
<td><input type="checkbox" class="day"></td>
<td><input type="checkbox" class="day"></td>

<td class="presentDays">0</td>

<td class="totalSalary">0</td>

<td><input type="number" class="advance" value="0"></td>

<td class="balance">0</td>

<td><button class="deleteBtn">❌</button></td>

`;

tableBody.appendChild(row);

bindEvents();

calculate();

};

// ---------- SAVE ----------

function saveData(){

localStorage.setItem(

"sagarConstruction",

tableBody.innerHTML

);

}

// ---------- LOAD ----------

window.onload=function(){

let data=localStorage.getItem("sagarConstruction");

if(data){

tableBody.innerHTML=data;

bindEvents();

calculate();

}else{

createWorkers();

}

}

// ---------- RESET ----------

document.getElementById("resetBtn").onclick=function(){

if(confirm("Start New Week?")){

localStorage.clear();

location.reload();

}

}

// ---------- PRINT ----------

document.getElementById("printBtn").onclick=function(){

window.print();

};

document.getElementById("pdfBtn").onclick=function(){

window.print();

};

// ---------- EXPORT CSV ----------

document.getElementById("exportBtn").onclick=downloadCSV;

document.getElementById("downloadBtn").onclick=downloadCSV;

function downloadCSV(){

let csv=[];

document.querySelectorAll("table tr").forEach(row=>{

let cols=row.querySelectorAll("td,th");

let arr=[];

cols.forEach(col=>{

let input=col.querySelector("input");

if(input){

if(input.type==="checkbox"){

arr.push(input.checked?"P":"A");

}else{

arr.push(input.value);

}

}else{

arr.push(col.innerText);

}

});

csv.push(arr.join(","));

});

let blob=new Blob([csv.join("\n")],{type:"text/csv"});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="SagarConstructionAttendance.csv";

link.click();

}