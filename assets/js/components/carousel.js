export function initCarousel() {
  let index = 0;
  const slides = document.getElementById("slides");
  if (!slides) return;

  const totalSlides = slides.children.length;

  setInterval(() => {
    const slideWidth = slides.clientWidth; // RESPONSIVE

    index++;
    if (index >= totalSlides) index = 0;

    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }, 3000);
}