import { renderDashboardPage } from "./pages/dashboardPage.js";
import { renderRoomsPage } from "./pages/roomsPage.js";
import { renderTenantsPage } from "./pages/tenantsPage.js";
import { renderPaymentsPage } from "./pages/paymentsPage.js";
import { initPaymentsPage } from "./controller/paymentController.js";


import { initRoomForm, renderRoomList, updateSummary } from "./controller/roomController.js";
import { initTenantPage } from "./controller/tenantController.js";

export function initRouter() {

  // default page = dashboard
  renderDashboardPage();

  document.addEventListener("click", (e) => {

    // DASHBOARD
    if (e.target.id === "nav-dashboard") {
      renderDashboardPage();
    }

    // ROOMS PAGE
    if (e.target.id === "nav-rooms") {
      renderRoomsPage();


    }

    // TENANTS PAGE
    if (e.target.id === "nav-tenants") {
      renderTenantsPage();

    }

    // PAYMENTS PAGE (nanti)
    if (e.target.id === "nav-payments") {
      renderPaymentsPage();
      initPaymentsPage();
    }

  });
}