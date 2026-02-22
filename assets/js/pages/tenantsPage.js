import { renderNavbar } from "../components/navbar.js";

export function renderTenantsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <h1>Tenants</h1>
  `;
}