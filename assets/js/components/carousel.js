export function initCarousel() {
  let index = 0;
  const slides = document.getElementById("slides");

  // kalau halaman tidak punya carousel → stop
  if (!slides) return;

  const totalSlides = slides.children.length;
  const slideWidth = 800;

  setInterval(() => {
    index++;
    if (index >= totalSlides) index = 0;

    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }, 3000);
}