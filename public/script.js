const devList = document.getElementById("devList");
const form = document.getElementById("devForm");
const API_URL = "/api/devs";

// 🟢 Load all developers
async function loadDevelopers() {
  const res = await fetch(API_URL);
  const devs = await res.json();

  devList.innerHTML = devs
    .map(
      (dev) => `
      <div class="col-md-4 mb-4">
        <div class="card p-3">
          <h5 class="fw-bold">${dev.name}</h5>
          <p class="text-muted mb-1">${dev.role}</p>
          <p><span class="badge bg-primary">${dev.skills}</span></p>
        </div>
      </div>
    `
    )
    .join("");
}

// 🟢 Add a new developer
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const skills = document.getElementById("skills").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role, skills }),
  });

  if (res.ok) {
    form.reset();
    loadDevelopers();
  }
});

// 🧠 Search/filter developers
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  const res = await fetch(API_URL);
  const devs = await res.json();

  const filtered = devs.filter(
    (dev) =>
      dev.name.toLowerCase().includes(query) ||
      dev.role.toLowerCase().includes(query) ||
      dev.skills.toLowerCase().includes(query)
  );

  devList.innerHTML = filtered
    .map(
      (dev) => `
      <div class="col-md-4 mb-4">
        <div class="card p-3">
          <h5 class="fw-bold">${dev.name}</h5>
          <p class="text-muted mb-1">${dev.role}</p>
          <p><span class="badge bg-primary">${dev.skills}</span></p>
        </div>
      </div>
    `
    )
    .join("");
});

loadDevelopers();
