export function renderNavbar() {
  return `
    <nav class="navbar">
      <div class="nav-left">
        <img src="assets/images/Logo.png" class="logo">
        <span class="brand-text">Bantu Ibu Kos</span>
      </div>
      <div class="nav-right">
        <button id="nav-dashboard">Dashboard</button>
        <button id="nav-rooms">Rooms</button>
        <button id="nav-tenants">Tenants</button>
        <button id="nav-payments">Payments</button>
      </div>
    </nav>
  `;
}