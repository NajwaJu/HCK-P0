import { renderNavbar } from "../components/navbar.js";

export function renderPaymentsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <h1>Payments</h1>
  `;
}