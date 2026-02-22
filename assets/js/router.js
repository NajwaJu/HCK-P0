import { renderDashboardPage } from "./pages/dashboardPage.js";
import { renderRoomsPage } from "./pages/roomsPage.js";
import { renderTenantsPage } from "./pages/tenantsPage.js";
import { renderPaymentsPage } from "./pages/paymentsPage.js";

export function initRouter() {
  renderDashboardPage(); // default page

  document.addEventListener("click", (e) => {
    if (e.target.id === "nav-dashboard") {
      renderDashboardPage();
    }

    if (e.target.id === "nav-rooms") {
      renderRoomsPage();
    }

    if (e.target.id === "nav-tenants") {
      renderTenantsPage();
    }

    if (e.target.id === "nav-payments") {
      renderPaymentsPage();
    }
  });
}