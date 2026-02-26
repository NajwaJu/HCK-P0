import { initPaymentsPage } from "../controller/paymentController.js";
import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";

export function renderPaymentsPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1>Manajemen Pembayaran</h1>

      <div class="form-card">
        <h2>Tanggal Transaksi Hari Ini</h2>
        <p>Tanggal ini akan digunakan untuk tenant yang dibayar.</p>
        <input type="date" id="paymentDate">
      </div>

      <div class="form-card">
        <h2>Daftar Pembayaran Tenant</h2>
        <div id="paymentList"></div>
      </div>
    </div>
    ${renderFooter()}
  `;

  initPaymentsPage();
}