const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  const foundUser = users.find(user => 
    user.username === usernameInput &&
    user.password === passwordInput
  );

  if (foundUser) {
    currentUser = foundUser;
    alert("Login berhasil!");
    showDashboard();
  } else {
    alert("Username atau password salah!");
  }
});