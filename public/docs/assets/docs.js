
const side=document.getElementById('docsSidebar');
const menu=document.getElementById('mobileDocsMenu');
if(menu&&side){
  menu.addEventListener('click',()=>{
    const open=side.classList.toggle('open');
    menu.setAttribute('aria-expanded',open?'true':'false');
  });
  document.addEventListener('click',e=>{
    if(window.innerWidth<=760 && side.classList.contains('open') && !side.contains(e.target) && !menu.contains(e.target)){
      side.classList.remove('open'); menu.setAttribute('aria-expanded','false');
    }
  });
}
const inp=document.getElementById('docsSearch'),box=document.getElementById('searchResults');
function rootPrefix(){const css=document.querySelector('link[href$="assets/docs.css"]');if(!css)return'';return css.getAttribute('href').replace('assets/docs.css','');}
if(inp&&box){
  inp.addEventListener('input',()=>{
    const q=inp.value.trim().toLowerCase();
    if(q.length<2){box.classList.remove('show');box.innerHTML='';return;}
    const data=(window.PORTIVO_DOC_SEARCH||[]).filter(x=>(x.title+' '+x.summary+' '+x.text).toLowerCase().includes(q)).slice(0,10);
    box.innerHTML=data.map(x=>`<a class="search-result" href="${rootPrefix()}${x.path}"><b>${x.title}</b><span>${x.summary}</span></a>`).join('')||'<div class="search-result">No results</div>';
    box.classList.add('show');
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.search'))box.classList.remove('show')});
}
if(location.protocol==='file:' || ['localhost','127.0.0.1'].includes(location.hostname)){
  document.querySelectorAll('a[href^="https://portivo.org/"]').forEach(a=>{
    const suffix=a.getAttribute('href').replace('https://portivo.org/','');
    const depth=(location.pathname.split('/docs.portivo.org/')[1]||'').split('/').filter(Boolean).length-1;
    a.setAttribute('href','../'.repeat(Math.max(0,depth)+1)+'portivo.org/'+suffix);
  });
}
