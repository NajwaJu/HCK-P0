import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { initCarousel } from "../components/carousel.js";
import { initDashboard } from "../controller/dashboardController.js";

export function renderDashboardPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${renderNavbar()}

     <div class="container">
      <h1 class="title">Selamat datang</h1>
      <p class="subtitle">  Sistem Manajemen Kos untuk membantu Anda mengatur kamar,
                            data penyewa, dan pembayaran dalam satu tempat.</p>

      <div class="carousel">
        <div class="slides" id="slides">
            <img src="assets/images/1caro.jpeg" alt="">
            <img src="assets/images/2caro.jpeg" alt="">
            <img src="assets/images/3caro.jpeg" alt="">
            <img src="assets/images/byr_kos.gif" alt="">
        </div>
      </div>



        <div class="dashboard-grid">
          <div class="card total">
            <div class="card-title">🏠 Total Kamar</div>
            <div class="card-value" id="dashTotalRoom">0</div>
          </div>

          <div class="card empty">
            <div class="card-title">🟢 Kamar Kosong</div>
            <div class="card-value" id="dashEmptyRoom">0</div>
          </div>

          <div class="card occupied">
            <div class="card-title">🔵 Kamar Terisi</div>
            <div class="card-value" id="dashOccupiedRoom">0</div>
          </div>

          <div class="card unpaid">
            <div class="card-title">💰 Pendapatan Bulan Ini</div>
            <div class="card-value" id="dashIncome">Rp 0</div>
          </div>
        </div>
      
    </div>
  ${renderFooter()}

  `;

  initCarousel();
  initDashboard();
}