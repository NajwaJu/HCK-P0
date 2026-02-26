import { addRoom, getRooms } from "../services/roomService.js";
import { getTenants } from "../services/tenantService.js";

export function initRoomForm() {
  const form = document.getElementById("roomForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ambil value dari input
    const number = document.getElementById("number").value.trim();
    const type = document.getElementById("type").value;
    const priceInput = document.getElementById("price").value.trim();

    // hanya angka
    if (!/^\d+$/.test(priceInput)) {
      alert("Harga harus berupa angka positif!");
      return;
    }

const price = Number(priceInput);
    const depositPolicy = document.getElementById("depositPolicy").value;
    // buat ID otomatis
    const roomId = "ROOM-" + Date.now();

    // kirim ke service
    const result = addRoom({
      id: roomId,
      name: number,
      type: type,
      price: price,
      depositPolicy: depositPolicy,
      status: "empty"
    });

    if (!result) {
      alert("Data kamar tidak valid / nomor kamar sudah ada!");
      return;
    }
    // // reset form
    // form.reset();

    // refresh tampilan kamar
    renderRoomList();
    updateSummary();
  });
}

export function renderRoomList() {
  const roomList = document.getElementById("roomList");
  if (!roomList) return;

  const rooms = getRooms();
  const tenants = getTenants();

  roomList.innerHTML = "";

  rooms.forEach(room => {
    const tenant = tenants.find(
      t => t.roomId === room.id && t.status === "active"
    );

    const occupant = tenant ? tenant.name : "-";
    const statusText = room.status === "empty" ? "Kosong" : "Terisi";

    roomList.innerHTML += `
      <tr>
        <td>${room.name}</td>
        <td>${room.type}</td>
        <td>Rp ${room.price}</td>
        <td>${occupant}</td>
        <td>${statusText}</td>
      </tr>
    `;
  });
}

export function updateSummary() {
  const rooms = getRooms();

  const total = rooms.length;
  const empty = rooms.filter(r => r.status === "empty").length;
  const occupied = rooms.filter(r => r.status === "occupied").length;

  document.getElementById("totalRoom").textContent = total;
  document.getElementById("emptyRoom").textContent = empty;
  document.getElementById("occupiedRoom").textContent = occupied;
}

