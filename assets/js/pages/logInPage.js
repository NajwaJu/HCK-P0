import { initLoginForm } from "../controller/logInController.js";

export function renderLoginPage() {
  const app = document.getElementById("app");
  if (!app) return;   

  app.innerHTML = `
    <div class="login-wrapper">
      <!-- LEFT SIDE - CAROUSEL -->
      <div class="login-left">
        <div class="login-hero">
          <div class="hero-content">
            <img src="./assets/images/Logo.png" alt="Bantu Ibu Kost Logo" class="login-logo">
            <h1 class="hero-title">Bantu Ibu Kost</h1>
            <p class="hero-subtitle">Kelola kosan Anda dengan mudah dan efisien</p>
          </div>
          
          <div class="carousel-container">
            <div class="carousel">
              <div class="carousel-slide fade">
                <img src="./assets/images/banner1.jpeg" alt="Banner 1">
              </div>
              <div class="carousel-slide fade">
                <img src="./assets/images/banner2.jpeg" alt="Banner 2">
              </div>
              <div class="carousel-slide fade">
                <img src="./assets/images/banner3.jpeg" alt="Banner 3">
              </div>
            </div>
            
            <button class="carousel-btn prev" onclick="changeSlide(-1)">&#10094;</button>
            <button class="carousel-btn next" onclick="changeSlide(1)">&#10095;</button>
            
            <div class="carousel-dots">
              <span class="dot" onclick="currentSlide(1)"></span>
              <span class="dot" onclick="currentSlide(2)"></span>
              <span class="dot" onclick="currentSlide(3)"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE - LOGIN FORM -->
      <div class="login-right">
        <form id="loginForm" class="login-form-card">
          <h2 class="form-title">Masuk ke Sistem</h2>
          <p class="form-subtitle">Kelola kosan Anda dengan aman</p>

          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Masukkan username" 
              required
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Masukkan password" 
              required
            >
          </div>

          <button class="buttonSubmit" type="submit">
            Login
          </button>

          <p class="login-footer">
            Demo: username <strong>ibukost</strong> | password <strong>12345</strong>
          </p>
        </form>
      </div>
    </div>
  `;

  initLoginForm();
  initCarouselSlider();
}

// Carousel variables
let slideIndex = 1;

// Carousel functions
window.changeSlide = function(n) {
  showSlide(slideIndex += n);
};

window.currentSlide = function(n) {
  showSlide(slideIndex = n);
};

function showSlide(n) {
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
  }
}

function initCarouselSlider() {
  showSlide(slideIndex);
  
  // Auto slide every 5 seconds
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}