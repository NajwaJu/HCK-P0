import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { initCarousel } from "../components/carousel.js";

export function renderDashboardPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${renderNavbar()}

    <div class="container">
      <h1 class="title">Bantu Ibu Kos</h1>
      <p class="subtitle">Selamat datang di Bantu Ibu Kos</p>

      <div class="carousel">
        <div class="slides" id="slides">
            <img src="../assets/images/1caro.jpeg" alt="">
            <img src="../assets/images/2caro.jpeg" alt="">
            <img src="../assets/images/3caro.jpeg" alt="">
            <img src="../assets/images/byr_kos.gif" alt="">
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