import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { initCarousel } from "../components/carousel.js";

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
        <div class="card">Total Kamar</div>
        <div class="card">Kamar Kosong</div>
        <div class="card">Kamar Terisi</div>
        <div class="card">Belum Bayar</div>
  </div>
  </div>
  ${renderFooter()}

  `;

  initCarousel();
}