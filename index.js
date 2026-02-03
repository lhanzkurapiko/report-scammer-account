// Admin credentials
const ADMIN_USER = "Jzovxieppg";
const ADMIN_PASS = "Jzovdev02";

// Load from localStorage or initialize
let pending = JSON.parse(localStorage.getItem("pending")) || [];
let approved = JSON.parse(localStorage.getItem("approved")) || [];
let isAdmin = false;

// Grab input elements
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const fbInput = document.getElementById("fb");
const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");
const listDiv = document.getElementById("list");

// Save function
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

  // Clear inputs
  nameInput.value = "";
  numberInput.value = "";
  fbInput.value = "";

  alert("Report submitted and pending approval!");
  render();
}

// Toggle admin nav
function openNav() {
  const nav = document.getElementById("adminNav");
  nav.classList.toggle("hidden");
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
    alert("Wrong username or password!");
  }
}

// Approve pending report
function approve(index) {
  approved.push(pending[index]);
  pending.splice(index, 1);
  save();
  render();
}

// Decline pending report
function decline(index) {
  pending.splice(index, 1);
  save();
  render();
}

// Render function
function render() {
  listDiv.innerHTML = "";

  // Render approved reports
  approved.forEach(r => {
    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <div>${r.name} | ${r.number}</div>
      <div class="fb" onclick="window.open('${r.fb}', '_blank')">FB</div>
    `;

    listDiv.appendChild(row);
  });

  // Render pending reports if admin
  if (isAdmin) {
    pending.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "row";

      row.innerHTML = `
        <div>${r.name} | ${r.number}</div>
        <div>
          <button onclick="approve(${i})">✔</button>
          <button onclick="decline(${i})">✖</button>
        </div>
      `;

      listDiv.appendChild(row);
    });
  }
}

// Initial render
render();
