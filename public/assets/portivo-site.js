const backToTop = document.getElementById('backToTop');

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const navigationEntry = performance.getEntriesByType('navigation')[0];
const isRefresh = (navigationEntry && navigationEntry.type === 'reload') ||
  (performance.navigation && performance.navigation.type === 1);

if (isRefresh && !window.location.hash) {
  const resetRefreshScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const stabilizeRefreshPosition = () => {
    resetRefreshScroll();
    requestAnimationFrame(resetRefreshScroll);
    [80, 240, 600].forEach((delay) => window.setTimeout(resetRefreshScroll, delay));
  };

  window.addEventListener('pageshow', stabilizeRefreshPosition, { once: true });
  window.addEventListener('load', stabilizeRefreshPosition, { once: true });
}

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 520);
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });
  updateBackToTop();
}
