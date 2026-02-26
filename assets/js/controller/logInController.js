import { renderDashboardPage } from "../pages/dashboardPage.js";
import { renderLoginPage } from "../pages/logInPage.js";

const users = [
  {
    username: "ibukost",
    password: "12345",
    role: "admin"
  }
];

let currentUser = null;

export function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;   

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const foundUser = users.find(user =>
      user.username === usernameInput &&
      user.password === passwordInput
    );

    if (foundUser) {
      currentUser = foundUser;
      renderDashboardPage();
    } else {
      alert("Username atau password salah!");
    }
  });
}

export function getCurrentUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
  renderLoginPage();
}

