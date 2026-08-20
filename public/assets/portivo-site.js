const backToTop = document.getElementById('backToTop');

const navigationEntry = performance.getEntriesByType('navigation')[0];
const isRefresh = (navigationEntry && navigationEntry.type === 'reload') ||
  (performance.navigation && performance.navigation.type === 1);

if (isRefresh && !window.location.hash) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const resetRefreshScroll = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  window.addEventListener('pageshow', () => {
    requestAnimationFrame(resetRefreshScroll);
    window.setTimeout(resetRefreshScroll, 120);
  }, { once: true });
}

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 520);
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
}
