import { addRoom, getRooms } from "../services/roomService.js";
import { getTenants } from "../services/tenantService.js";

let currentPage = 1;
const ROWS_PER_PAGE = 4;

export function initRoomForm() {
  const form = document.getElementById("roomForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const number = document.getElementById("number").value.trim();

    // 🔥 dropdown BARU
    const acType = document.getElementById("acType").value;
    const bathroomType = document.getElementById("bathroomType").value;

    // gabungkan tipe kamar
    const type = `${acType} + ${bathroomType}`;

    const priceInput = document.getElementById("price").value.trim();

    // validasi harga angka positif
    if (!/^\d+$/.test(priceInput)) {
      alert("Harga harus berupa angka positif!");
      return;
    }

    const price = Number(priceInput);
    const roomId = "ROOM-" + Date.now();

    const result = addRoom({
      id: roomId,
      name: number,
      type: type,
      price: price,
      status: "empty"
    });

    if (!result) {
      alert("Nomor kamar sudah ada!");
      return;
    }

    currentPage = 1;
    renderRoomList();
    updateSummary();
  });
}

export function renderRoomList(keyword = "") {
  const roomList = document.getElementById("roomList");
  if (!roomList) return;

  const rooms = getRooms();
  const tenants = getTenants();

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRooms.length / ROWS_PER_PAGE);

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;
  const paginatedRooms = filteredRooms.slice(start, end);

  roomList.innerHTML = "";

  if (paginatedRooms.length === 0) {
    roomList.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:20px;">
          Tidak ada kamar ditemukan
        </td>
      </tr>
    `;
    return;
  }

  paginatedRooms.forEach(room => {
    const tenant = tenants.find(t => t.roomId === room.id && t.status === "active");
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

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const container = document.getElementById("roomPagination");
  if (!container) return;

  container.innerHTML = `
    <button id="prevPage">◀ Prev</button>
    <span>Halaman ${currentPage} / ${totalPages || 1}</span>
    <button id="nextPage">Next ▶</button>
  `;

  document.getElementById("prevPage").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderRoomList(document.getElementById("searchRoomInput").value);
    }
  };

  document.getElementById("nextPage").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderRoomList(document.getElementById("searchRoomInput").value);
    }
  };
}

export function updateSummary() {
  const rooms = getRooms();

  document.getElementById("totalRoom").textContent = rooms.length;
  document.getElementById("emptyRoom").textContent =
    rooms.filter(r => r.status === "empty").length;
  document.getElementById("occupiedRoom").textContent =
    rooms.filter(r => r.status === "occupied").length;
}

export function initRoomSearch() {
  const input = document.getElementById("searchRoomInput");
  if (!input) return;

  input.addEventListener("input", () => {
    currentPage = 1;
    renderRoomList(input.value.trim());
  });
}