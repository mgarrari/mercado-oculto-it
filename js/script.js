let data = [];

async function loadData() {
  const res = await fetch("data.json");
  data = await res.json();
  renderTable(data);
  document.getElementById("lastUpdated").textContent = new Date().toLocaleDateString("es-ES");
}

function renderTable(rows) {
  const tbody = document.querySelector("#companiesTable tbody");
  tbody.innerHTML = "";
  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${r.empresa}</strong></td>
      <td>${r.banda_salarial}</td>
      <td>${r.area_objetivo}</td>
      <td>${r.responsable_objetivo}</td>
      <td>
        <span class="puerta-bar"><span class="puerta-fill" style="width:${r.puerta_real*10}%"></span></span>
        ${r.puerta_real}/10
      </td>
      <td>${r.prob_conversacion}</td>
      <td>
        <span class="oculto-bar"><span class="oculto-fill" style="width:${r.puesto_oculto*10}%"></span></span>
        ${r.puesto_oculto}/10
      </td>
      <td>${r.prob_exista_sin_publicar}</td>
      <td>${r.ultima_senal}</td>
      <td>${r.proxima_accion}</td>
      <td>${r.accion_tuya}</td>
    `;
    tbody.appendChild(tr);
  });
}

function filterAndSort() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const sort = document.getElementById("sortSelect").value;

  let filtered = data.filter(r =>
    r.empresa.toLowerCase().includes(query) ||
    r.area_objetivo.toLowerCase().includes(query) ||
    r.responsable_objetivo.toLowerCase().includes(query)
  );

  filtered.sort((a,b) => {
    if (sort === "puerta_real_desc") return b.puerta_real - a.puerta_real;
    if (sort === "puerta_real_asc") return a.puerta_real - b.puerta_real;
    if (sort === "puesto_oculto_desc") return b.puesto_oculto - a.puesto_oculto;
    if (sort === "puesto_oculto_asc") return a.puesto_oculto - b.puesto_oculto;
    if (sort === "empresa_asc") return a.empresa.localeCompare(b.empresa);
    return 0;
  });

  renderTable(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  document.getElementById("searchInput").addEventListener("input", filterAndSort);
  document.getElementById("sortSelect").addEventListener("change", filterAndSort);
});
