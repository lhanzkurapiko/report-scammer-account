const ADMIN_USER = "Jzovxieppg";
const ADMIN_PASS = "Jzovdev02";

let pending = JSON.parse(localStorage.getItem("pending")) || [];
let approved = JSON.parse(localStorage.getItem("approved")) || [];
let isAdmin = false;

function save() {
  localStorage.setItem("pending", JSON.stringify(pending));
  localStorage.setItem("approved", JSON.stringify(approved));
}

function submitReport() {
  const name = name.value || "unknown";
  const number = number.value || "unknown";
  const fb = fb.value || "#";
  pending.push({ name, number, fb });
  save();
  alert("Submitted for approval");
}

function openNav() {
  document.getElementById("adminNav").classList.toggle("hidden");
}

function adminLogin() {
  if (user.value === ADMIN_USER && pass.value === ADMIN_PASS) {
    isAdmin = true;
    alert("Admin logged in");
    render();
  } else {
    alert("Wrong login");
  }
}

function render() {
  list.innerHTML = "";
  approved.forEach(r => {
    list.innerHTML += `
      <div class="row">
        <div>${r.name} | ${r.number}</div>
        <div class="fb" onclick="window.open('${r.fb}')">FB</div>
      </div>
    `;
  });

  if (isAdmin) {
    pending.forEach((r, i) => {
      list.innerHTML += `
        <div class="row">
          <div>${r.name} | ${r.number}</div>
          <div>
            <button onclick="approve(${i})">✔</button>
            <button onclick="decline(${i})">✖</button>
          </div>
        </div>
      `;
    });
  }
}

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

render();
