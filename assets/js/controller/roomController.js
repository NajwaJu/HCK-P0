import { addRoom, getRooms } from "../services/roomService.js";

export function initRoomForm() {
  const form = document.getElementById("roomForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ambil value dari input
    const number = document.getElementById("number").value;
    const type = document.getElementById("type").value;
    const price = Number(document.getElementById("price").value);
    const depositPolicy = document.getElementById("depositPolicy").value;
    // buat ID otomatis
    const roomId = "ROOM-" + Date.now();

    // kirim ke service
    addRoom({
      id: roomId,
      name: number,
      type: type,
      price: price,
      depositPolicy: depositPolicy,
      status: "empty"
    });

    // reset form
    form.reset();

    // refresh tampilan kamar
    renderRoomList();
    updateSummary();
  });
}

export function renderRoomList() {
  const roomList = document.getElementById("roomList");
  if (!roomList) return;

  const rooms = getRooms();

  roomList.innerHTML = "";

  rooms.forEach(room => {
    const statusClass = room.status === "empty" ? "empty" : "occupied";
    const statusText = room.status === "empty" ? "Kosong" : "Terisi";

    roomList.innerHTML += `
      <div class="room-item">
        <div class="room-number">${room.name}</div>
        <div class="room-type">${room.type}</div>
        <div class="room-price">Rp ${room.price}</div>
        <span class="status ${statusClass}">${statusText}</span>
      </div>
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

