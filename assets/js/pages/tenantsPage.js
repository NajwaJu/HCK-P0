import { renderNavbar } from "../components/navbar.js";
import {
  initTenantForm,
  renderTenantList,
  populateRoomDropdown
} from "../controller/tenantController.js";

initTenantForm();
renderTenantList();
populateRoomDropdown();

export function renderTenantsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1 class ="">Manajemen Penghuni Kos</h1>


      <div class ="space">
      <div class="form-card">

        <form id="tenantForm-Card">
          <h2>Tambah Penghuni</h2>

          <input type="text" id="tenantName" placeholder="Nama Penghuni" required>

          <select id="roomSelect" required>
           <option value="">Pilih Kamar</option>
           
          </select>

          <input id="rentPriceInput" type="number" placeholder="Harga sewa" readonly>
          <input id="depositInput" type="number" placeholder="Deposit">


          <button class="buttonSubmit" type="submit">Check-In Penghuni</button>
        </form>

        <div id="tenantList"></div>

      </div>
      </div>


   
    </div>


  `;
}