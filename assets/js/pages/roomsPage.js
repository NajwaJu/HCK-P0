import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { initRoomForm, renderRoomList, updateSummary } from "../controller/roomController.js";

export function renderRoomsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1>Manajemen Kamar Kos</h1>

      <div class="room-summary">
        <div class="summary-card">Total Kamar<br><strong id="totalRoom">0</strong></div>
        <div class="summary-card">Kamar Kosong<br><strong id="emptyRoom">0</strong></div>
        <div class="summary-card">Kamar Terisi<br><strong id="occupiedRoom">0</strong></div>
      </div>

      <div class="form-card">
        <form id="roomForm">
          <h2>Tambah Kamar</h2>

          <input type="text" id="number" placeholder="Nomor Kamar" required>

          <select id="type">
          <option value="AC">AC</option>
          <option value="Non AC">Non AC</option>
          <option value="Kamar Dalam">Kamar Dalam</option>
          <option value="Kamar Luar">Kamar Luar</option>
          </select>

          <input type="number" id="price" placeholder="Harga per bulan" required>
          <select id="depositPolicy">
            <option value="yes">Pakai Deposit</option>
            <option value="no">Tanpa Deposit</option>
          </select>
          <button class="buttonSubmit" type="submit">Simpan Kamar</button>
        </form>
      </div>

      <input placeholder="Cari kamar...">
      <div class="form-card">
      <div class="list-header">
        <h2>Daftar Kamar</h2>
      </div>
        <div id="roomList" class="room-list"></div>
      </div>
   
    </div>
    


    ${renderFooter()}

  `;
  initRoomForm();
  renderRoomList();
  updateSummary();
}