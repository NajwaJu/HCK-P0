let slideIndex = 1;
let autoSlideInterval = null;

export function initLoginCarousel() {
  const slides = document.getElementsByClassName("carousel-slide");
  if (slides.length === 0) return;

  showSlide(slideIndex);

  // Auto slide tiap 5 detik
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName("carousel-slide");
  const dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  // sembunyikan semua slide
  for (let slide of slides) slide.style.display = "none";

  // hapus active dot
  for (let dot of dots) dot.classList.remove("active");

  // tampilkan slide aktif
  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active");
}

// expose ke tombol HTML
window.changeSlide = changeSlide;
window.currentSlide = (n) => showSlide(slideIndex = n);