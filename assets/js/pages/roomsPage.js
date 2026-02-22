import { renderNavbar } from "../components/navbar.js";

export function renderRoomsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <h1>Rooms Page</h1>
  `;
}