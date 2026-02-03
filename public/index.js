// Grab elements
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const fbInput = document.getElementById("fb");
const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");
const listDiv = document.getElementById("list");
const adminNav = document.getElementById("adminNav");

// Admin credentials
const ADMIN_USER = "Jzovxieppg";
const ADMIN_PASS = "Jzovdev02";

// Load data
let pending = JSON.parse(localStorage.getItem("pending")) || [];
let approved = JSON.parse(localStorage.getItem("approved")) || [];
let isAdmin = false;

// Save data
function save() {
  localStorage.setItem("pending", JSON.stringify(pending));
  localStorage.setItem("approved", JSON.stringify(approved));
}

// Submit report
function submitReport() {
  const name = nameInput.value.trim() || "unknown";
  const number = numberInput.value.trim() || "unknown";
  const fb = fbInput.value.trim() || "#";

  pending.push({ name, number, fb });
  save();

  nameInput.value = "";
  numberInput.value = "";
  fbInput.value = "";

  alert("Report submitted (pending approval)");
  render();
}

// Toggle admin menu
function openNav() {
  adminNav.classList.toggle("hidden");
}

// Admin login
function adminLogin() {
  const username = userInput.value.trim();
  const password = passInput.value.trim();

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    isAdmin = true;
    alert("Admin logged in!");
    render();
  } else {
    alert("Wrong credentials");
  }
}

// Approve / Decline
function approve(i) {
  approved.push(pending[i]);
  pending.splice(i, 1);
  save();
  render();
}

function decline(i) {
  pending.splice(i, 1);
  save();
  render();
}

// Render lists
function render() {
  listDiv.innerHTML = "";

  // Approved
  approved.forEach(r => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<div>${r.name} | ${r.number}</div>
                     <div class="fb" onclick="window.open('${r.fb}', '_blank')">FB</div>`;
    listDiv.appendChild(row);
  });

  // Pending (only for admin)
  if (isAdmin) {
    pending.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<div>${r.name} | ${r.number}</div>
                       <div>
                         <button onclick="approve(${i})">✔</button>
                         <button onclick="decline(${i})">✖</button>
                       </div>`;
      listDiv.appendChild(row);
    });
  }
}

// Initial render
render();
