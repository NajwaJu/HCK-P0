import { getRooms } from "../services/roomService.js";
import { getPayments } from "../services/paymentService.js";

export function initDashboard() {
  updateDashboardCards();
}

function updateDashboardCards() {
  const rooms = getRooms();
  const payments = getPayments();

  // ===== ROOM STATS =====
  const totalRoom = rooms.length;
  const emptyRoom = rooms.filter(r => r.status === "empty").length;
  const occupiedRoom = rooms.filter(r => r.status === "occupied").length;

  // ===== HITUNG PENDAPATAN BULAN INI =====
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  let incomeThisMonth = 0;

  payments.forEach(p => {
    if (!p.lastPaymentDate) return;

    const payDate = new Date(p.lastPaymentDate);

    if (
      payDate.getMonth() === thisMonth &&
      payDate.getFullYear() === thisYear
    ) {
      incomeThisMonth += p.monthlyRent;
    }
  });

  // ===== INJECT KE UI =====
  document.getElementById("dashTotalRoom").textContent = totalRoom;
  document.getElementById("dashEmptyRoom").textContent = emptyRoom;
  document.getElementById("dashOccupiedRoom").textContent = occupiedRoom;

  document.getElementById("dashIncome").textContent =
    "Rp " + incomeThisMonth.toLocaleString("id-ID");
}