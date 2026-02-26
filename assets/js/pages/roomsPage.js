import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { initRoomForm, renderRoomList, updateSummary, initRoomSearch } from "../controller/roomController.js";

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

          <select id="acType">
            <option value="AC">AC</option>
            <option value="Non AC">Non AC</option>
          </select>

          <select id="bathroomType">
            <option value="Kamar Mandi Dalam">Kamar Mandi Dalam</option>
            <option value="Kamar Mandi Luar">Kamar Mandi Luar</option>
          </select>

          <input 
            type="text" 
            id="price" 
            placeholder="Harga per bulan"
            inputmode="numeric"
            pattern="[0-9]*"
            required
          >

          <button class="buttonSubmit" type="submit">Simpan Kamar</button>

        </form>
      </div>

      <div class="search-wrapper">
        <input id="searchRoomInput" type="text" placeholder="Cari nomor kamar..." />
      </div>

      <div class="form-card">
      <div class="list-header">
        <h2>Daftar Kamar</h2>
      </div>
        <table class="room-table">
          <thead>
            <tr>
              <th>No Kamar</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Penghuni</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="roomList"></tbody>
        </table>

      <div id="roomPagination" class="pagination"></div>
      </div>
   
    </div>
    


    ${renderFooter()}

  `;
  initRoomForm();
  renderRoomList();
  updateSummary();
  initRoomSearch();
}