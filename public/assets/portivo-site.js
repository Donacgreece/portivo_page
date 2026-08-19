const backToTop = document.getElementById('backToTop');

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 520);
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
}
