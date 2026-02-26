export function initCarousel() {
  let slideIndex = 1;
  showSlide(slideIndex);
  
  // Auto slide every 5 seconds
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function changeSlide(n) {
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return;
  
  let slideIndex = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].style.display !== "none") {
      slideIndex = i + 1;
      break;
    }
  }
  
  slideIndex += n;
  
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slideIndex < 1) { slideIndex = slides.length; }
  
  showSlide(slideIndex);
}

function currentSlide(n) {
  showSlide(n);
}

function showSlide(n) {
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return;
  
  if (n > slides.length) { n = 1; }
  if (n < 1) { n = slides.length; }
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[n - 1].style.display = "block";
  if (dots[n - 1]) {
    dots[n - 1].className += " active";
  }
}

// Make functions globally available
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
