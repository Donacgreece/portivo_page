const backToTop = document.getElementById('backToTop');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const siteNav = document.getElementById('siteNav');

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

if (mobileNavToggle && siteNav) {
  const setMenu = (open) => {
    mobileNavToggle.setAttribute('aria-expanded', String(open));
    mobileNavToggle.textContent = open ? 'Close' : 'Menu';
    siteNav.dataset.open = String(open);
  };
  mobileNavToggle.addEventListener('click', () => setMenu(mobileNavToggle.getAttribute('aria-expanded') !== 'true'));
  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenu(false);
      mobileNavToggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setMenu(false);
  });
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
