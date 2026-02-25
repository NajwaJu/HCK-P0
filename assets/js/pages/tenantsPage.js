import { renderNavbar } from "../components/navbar.js";

export function renderTenantsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1 class ="">Manajemen Penghuni Kos</h1>


      <div class ="space">
      <div class="form-card">

        <form id="tenantForm">
          <h2>Tambah Penghuni</h2>

          <input type="text" id="tenantName" placeholder="Nama Penghuni" required>

          <input type="tel" id="tenantPhone" placeholder="Nomor HP">

          <select id="roomId" required>
          <option value="">Pilih Kamar</option>
          </select>

          <input type="date" id="checkInDate" required>

            <button class="buttonSubmit" type="submit">Check-In Penghuni</button>
        </form>

      </div>
      </div>


   
    </div>


  `;
}