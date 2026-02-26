import { addTenant, getTenants, deleteTenant } from "../services/tenantService.js";
import { getRooms } from "../services/roomService.js";

export function populateRoomDropdown() {
  const select = document.getElementById("roomSelect");
  if (!select) return;

  const rooms = getRooms();

  select.innerHTML = "";

  rooms.forEach(room => {
    if (room.status === "empty") {
      select.innerHTML += `
        <option value="${room.id}"  
          data-deposit="${room.depositPolicy}" 
          data-price="${room.price}">
          ${room.name} (${room.type})
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

    const name = document.getElementById("tenantName").value;
    const roomId = document.getElementById("roomSelect").value;
    const room = getRoom(roomId);

    const deposit = room.depositPolicy === " hookup yes" ? room.price : 0;

    addTenant({
      name,
      roomId,
      rentPrice: room.price,
      deposit: deposit
    });

    form.reset();

    renderTenantList();
    populateRoomDropdown();
  });
}

export function renderTenantList() {
  const container = document.getElementById("tenantList");
  if (!container) return;

  const tenants = getTenants();

  container.innerHTML = "";

  tenants.forEach(t => {
    container.innerHTML += `
      <div class="tenant-card">
        <b>${t.name}</b> - Room ${t.roomId}
        <button onclick="removeTenant('${t.id}')">Hapus</button>
      </div>
    `;
  });
}

window.removeTenant = function(id) {
  deleteTenant(id);
  renderTenantList();
  populateRoomDropdown();
}

export function handleRoomSelection() {
  const roomSelect = document.getElementById("roomSelect");
  const depositInput = document.getElementById("depositInput");
  const rentInput = document.getElementById("rentPriceInput");

  if (!roomSelect) return;

  roomSelect.addEventListener("change", () => {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];

    const depositPolicy = selectedOption.dataset.deposit;
    const roomPrice = selectedOption.dataset.price;

    // auto isi harga sewa dari room
    rentInput.value = roomPrice;

    // logic deposit
    if (depositPolicy === "yes") {
      depositInput.style.display = "block";
      depositInput.value = roomPrice; // default deposit = 1 bulan
    } else {
      depositInput.style.display = "none";
      depositInput.value = 0;
    }
  });
}
