let posts = [];
let idx = 0;
async function load(){
  try{
    const res = await fetch('content/posts.json');
    posts = await res.json();
    idx = +(localStorage.getItem('idx') || 0) % posts.length;
    render();
  }catch(e){
    document.getElementById('postTitle').textContent = 'Sin conexión — contenido disponible offline tras la primera carga.';
  }
}
function render(){
  const p = posts[idx];
  document.getElementById('postTitle').textContent = p.title;
  document.getElementById('postImg').src = p.image;
  document.getElementById('affirmation').textContent = p.affirmation;
  document.getElementById('cta').textContent = p.cta;
  localStorage.setItem('idx', idx);
}
document.getElementById('prevBtn').onclick = ()=>{ idx = (idx - 1 + posts.length) % posts.length; render(); };
document.getElementById('nextBtn').onclick = ()=>{ idx = (idx + 1) % posts.length; render(); };
document.getElementById('shareBtn').onclick = async ()=>{
  const p = posts[idx];
  const text = `${p.title} — ${p.affirmation} \n${p.cta} \nby Airmid Áurea`;
  if(navigator.share){
    navigator.share({title: 'Airmid Áurea Fit', text, url: location.href}).catch(()=>{});
  }else{
    navigator.clipboard.writeText(text);
    alert('Texto copiado para compartir ✨');
  }
};

// PWA install handling
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'inline-block';
});
document.getElementById('installBtn').addEventListener('click', async ()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBtn').style.display = 'none';
});

// Service worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('service-worker.js');
  });
}

load();