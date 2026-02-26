import { renderNavbar } from "../components/navbar.js";
import { initTenantPage } from "../controller/tenantController.js";




export function renderTenantsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1 class ="">Manajemen Penghuni Kos</h1>


      <div class ="space">
        <div class="form-card">

            <form id="tenantForm" novalidate>
              <h2>Tambah Penghuni</h2>

              <input type="text" id="tenantName" placeholder="Nama Penghuni" required>

              <select id="roomSelect" required>
                <option value="">Pilih Kamar</option>
              </select>

              <button class="buttonSubmit" type="submit">Check-In Penghuni</button>
            </form>

        </div>



        <div class="form-card">
          <h2>Daftar Penghuni</h2>
          <table class="tenant-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>No Kamar</th>
                <th>Tipe</th>
                <th>Deposit</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="tenantList"></tbody>
          </table>
        </div>
      </div>


   
    </div>


  `;
  initTenantPage();
}