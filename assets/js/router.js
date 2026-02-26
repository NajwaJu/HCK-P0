import { renderDashboardPage } from "./pages/dashboardPage.js";
import { renderRoomsPage } from "./pages/roomsPage.js";
import { renderTenantsPage } from "./pages/tenantsPage.js";
import { renderPaymentsPage } from "./pages/paymentsPage.js";
import { initPaymentsPage } from "./controller/paymentController.js";
import { renderLoginPage } from "./pages/logInPage.js";
import { getCurrentUser, logout } from "./controller/logInController.js";




export function initRouter() {
  if (!getCurrentUser()) {
    renderLoginPage();
  } else {
    renderDashboardPage();
  }

  document.addEventListener("click", (e) => {
    if (!getCurrentUser()) {
      return;
    }

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
      initPaymentsPage();
    }

    if (e.target.id === "logout-btn") {
      logout();
    }
  });

  window.addEventListener("hashchange", () => {
    if (!getCurrentUser()) {
      renderLoginPage();
      return;
    }

    const hash = window.location.hash.slice(1);

    if (hash === "dashboard" || hash === "") {
      renderDashboardPage();
    } else if (hash === "rooms") {
      renderRoomsPage();

    } else if (hash === "tenants") {
      renderTenantsPage();

    } else if (hash === "payments") {
      renderPaymentsPage();
      initPaymentsPage();
    }
  });
}