
const btn=document.querySelector('[data-mobile-menu]');
const nav=document.querySelector('.navlinks');
if(btn&&nav){
  btn.addEventListener('click',()=>{
    const open=nav.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
  document.addEventListener('click',e=>{
    if(!nav.contains(e.target)&&!btn.contains(e.target)&&nav.classList.contains('menu-open')){
      nav.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');
    }
  });
  window.addEventListener('resize',()=>{if(window.innerWidth>900){nav.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');}});
}
// When previewing the complete package locally, route docs links to the sibling docs site.
if(location.protocol==='file:' || ['localhost','127.0.0.1'].includes(location.hostname)){
  document.querySelectorAll('a[href^="https://docs.portivo.org/"]').forEach(a=>{
    const suffix=a.getAttribute('href').replace('https://docs.portivo.org/','');
    const base=location.pathname.includes('/portivo.org/')?'../docs.portivo.org/':'docs.portivo.org/';
    a.setAttribute('href',base+suffix);
  });
}
