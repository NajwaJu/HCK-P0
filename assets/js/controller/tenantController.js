import { addTenant, getTenants, deleteTenant } from "../services/tenantService.js";
import { getRooms } from "../services/roomService.js";

export function populateRoomDropdown() {
  const select = document.getElementById("roomSelect");
  if (!select) return;

  const rooms = getRooms();
  select.innerHTML = `<option value="">Pilih Kamar</option>`;

  rooms.forEach(room => {
    if (room.status === "empty") {
      select.innerHTML += `
        <option 
          value="${room.id}"
          data-price="${room.price}"
          data-deposit="${room.depositPolicy}">
          
          ${room.name} (${room.type}) - Rp ${room.price}
        </option>
      `;
    }
  });
}

export function initTenantForm() {
  const form = document.getElementById("tenantForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("tenantName").value.trim();
    const roomId = document.getElementById("roomSelect").value;

    if (!roomId) {
      alert("Pilih kamar terlebih dahulu!");
      return;
    }

    //  ambil option yang dipilih
    const selectedOption = document.querySelector("#roomSelect option:checked");

    const roomPrice = Number(selectedOption.dataset.price);
    const depositPolicy = selectedOption.dataset.deposit;

    //  hitung deposit
    let depositValue = 0;
    if (depositPolicy === "yes") {
      depositValue = roomPrice;
    }

    const result = addTenant({
      name,
      roomId,
      rentPrice: roomPrice,
      deposit: depositValue
    });

    if (!result) {
      alert("Gagal check-in tenant");
      return;
    }

    form.reset();
    renderTenantList();
    populateRoomDropdown();
  });
}

export function renderTenantList() {
  const container = document.getElementById("tenantList");
  if (!container) return;

  const tenants = getTenants();
  const rooms = getRooms();

  container.innerHTML = "";

  tenants.forEach(t => {
    const room = rooms.find(r => r.id === t.roomId);

    const roomNumber = room ? room.name : "-";
    const roomType = room ? room.type : "-";

    const depositStatus = t.deposit > 0 ? "Pakai Deposit" : "Tanpa Deposit";
    const statusText = t.status === "active" ? "Aktif" : "Nonaktif";

    container.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${roomNumber}</td>
        <td>${roomType}</td>
        <td>${depositStatus}</td>
        <td>${statusText}</td>
        <td>
          <button onclick="removeTenant('${t.id}')">Hapus</button>
        </td>
      </tr>
    `;
  });
}

window.removeTenant = function(id) {
  deleteTenant(id);
  renderTenantList();
  populateRoomDropdown();
}




export function initTenantPage() {
  populateRoomDropdown();
  renderTenantList();
  initTenantForm();
}
