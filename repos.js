/* ============================================================
   repos.js — arsenal page logic
   depends on repos-data.js (REPOS, REPO_CATEGORIES)
   ============================================================ */
(function(){
  const PAGE = 30;                 // cards rendered per chunk
  const grid   = document.getElementById('grid');
  const pillBox= document.getElementById('pills');
  const search = document.getElementById('search');
  const countEl= document.getElementById('count');
  const moreBtn= document.getElementById('loadmore');
  const emptyEl= document.getElementById('empty');

  const catLabel = id => (REPO_CATEGORIES.find(c=>c.id===id)||{}).label || id;
  const fmtStars = n => n>=1000 ? (n/1000).toFixed(n>=10000?0:1).replace(/\.0$/,'')+'k' : ''+n;

  let activeCat = 'all';
  let query = '';
  let filtered = [];
  let shown = 0;

  /* ---- category pills (with live counts) ---- */
  function buildPills(){
    const counts = {};
    REPOS.forEach(r => r.cats.forEach(c => counts[c]=(counts[c]||0)+1));
    const pills = [`<button class="pill on" data-cat="all">all<span class="c">${REPOS.length}</span></button>`];
    REPO_CATEGORIES.forEach(c=>{
      if(!counts[c.id]) return;            // hide empty categories
      pills.push(`<button class="pill" data-cat="${c.id}">${c.label}<span class="c">${counts[c.id]}</span></button>`);
    });
    pillBox.innerHTML = pills.join('');
    pillBox.querySelectorAll('.pill').forEach(p=>p.onclick=()=>{
      pillBox.querySelectorAll('.pill').forEach(x=>x.classList.remove('on'));
      p.classList.add('on'); activeCat=p.dataset.cat; apply();
    });
  }

  /* ---- card markup ---- */
  function card(r){
    const url = `https://github.com/${r.owner}/${r.repo}`;
    const og  = `https://opengraph.githubassets.com/${r.owner}-${r.repo}/${r.owner}/${r.repo}`;
    const initials = (r.repo.replace(/[^a-zA-Z0-9]/g,'').slice(0,2) || r.owner.slice(0,2)).toUpperCase();
    const primary = catLabel(r.cats[0]);
    return `<a class="rcard" href="${url}" target="_blank" rel="noopener">
      <div class="rcard-img">
        <img loading="lazy" alt="${r.owner}/${r.repo}" src="${og}"
             onerror="repoImgFallback(this,'${r.owner}','${initials}')">
      </div>
      <div class="rcard-foot">
        <span class="rcard-cat">${primary}</span>
        <span class="rcard-name">${r.owner}/${r.repo}</span>
        <span class="rcard-lang">${r.lang||''}</span>
        <span class="rcard-star">★ ${fmtStars(r.stars||0)}</span>
      </div>
    </a>`;
  }

  /* ---- filtering ---- */
  function apply(){
    const q = query.trim().toLowerCase();
    filtered = REPOS.filter(r=>{
      const catOk = activeCat==='all' || r.cats.includes(activeCat);
      if(!catOk) return false;
      if(!q) return true;
      return (`${r.owner} ${r.repo} ${r.desc} ${r.cats.join(' ')}`).toLowerCase().includes(q);
    });
    grid.innerHTML=''; shown=0;
    renderChunk();
    countEl.textContent = `${filtered.length} tool${filtered.length===1?'':'s'}`
      + (activeCat!=='all'?` in ${catLabel(activeCat)}`:'') + (q?` matching "${query.trim()}"`:'');
    emptyEl.style.display = filtered.length ? 'none' : 'block';
  }

  function renderChunk(){
    const next = filtered.slice(shown, shown+PAGE);
    grid.insertAdjacentHTML('beforeend', next.map(card).join(''));
    shown += next.length;
    moreBtn.style.display = shown < filtered.length ? 'inline-block' : 'none';
    moreBtn.textContent = `load more ▾  (${filtered.length-shown} left)`;
  }

  /* ---- events ---- */
  moreBtn.onclick = renderChunk;
  let deb;
  search.oninput = e=>{ clearTimeout(deb); deb=setTimeout(()=>{ query=e.target.value; apply(); },120); };
  // press "/" anywhere to focus search
  addEventListener('keydown', e=>{
    if(e.key==='/' && document.activeElement!==search){ e.preventDefault(); search.focus(); }
    if(e.key==='Escape' && document.activeElement===search){ search.value=''; query=''; apply(); search.blur(); }
  });

  buildPills();
  apply();
})();

/* image fallback chain: OG card -> owner avatar -> monogram tile */
function repoImgFallback(img, owner, initials){
  if(img.dataset.stage==='avatar'){
    const tile=document.createElement('div');
    tile.className='rcard-mono'; tile.textContent=initials;
    img.parentNode.appendChild(tile); img.remove(); return;
  }
  img.dataset.stage='avatar';
  img.src=`https://github.com/${owner}.png?size=400`;
}