import {
  getPayments,
  payMonthlyRent,
  checkPaymentStatus
} from "../services/paymentService.js";

import { getTenantById } from "../services/tenantService.js";
import { getRoom } from "../services/roomService.js";

export function initPaymentsPage() {
  renderPaymentList();
}

export function renderPaymentList() {
  const container = document.getElementById("paymentList");
  if (!container) return;

  const payments = getPayments();
  container.innerHTML = "";

  if (payments.length === 0) {
    container.innerHTML = "<p>Belum ada data pembayaran.</p>";
    return;
  }

  payments.forEach(p => {
    const tenant = getTenantById(p.tenantId);
    const room = getRoom(p.roomId);

    const tenantName = tenant ? tenant.name : "-";
    const roomName = room ? room.name : "-";

    const statusBadge =
      p.status === "paid"
        ? `<span class="status active">Paid</span>`
        : `<span class="status evicted">Unpaid</span>`;

    container.innerHTML += `
      <div class="payment-card">
        <div class="payment-info">
          <h3>${tenantName}</h3>
          <p>Kamar : ${roomName}</p>
          <p>Sewa Bulanan : Rp ${p.monthlyRent}</p>
          <p>Last Payment : ${p.lastPaymentDate || "-"}</p>
          <p>Status : ${statusBadge}</p>
        </div>

        <div class="payment-actions">
          <button onclick="payNow('${p.id}')">Bayar</button>
          <button onclick="checkLate('${p.id}')">Cek Telat</button>
        </div>
      </div>
    `;
  });
}

function getTodayDate() {
  return document.getElementById("paymentDate").value;
}

window.payNow = function (paymentId) {
  const date = getTodayDate();
  if (!date) return alert("Pilih tanggal dulu!");

  payMonthlyRent(paymentId, date);
  renderPaymentList();
};

window.checkLate = function (paymentId) {
  const today = getTodayDate();
  if (!today) return alert("Pilih tanggal dulu!");

  // ini yang sebelumnya missing:
  const message = checkPaymentStatus(paymentId, today);

  alert(message);
  renderPaymentList(); // biar status Paid/Unpaid ikut ke-update
};