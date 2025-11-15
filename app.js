// -----------------------------
//   CARGA DE POSTS / MOTIVACIÓN
// -----------------------------
let posts = [];
let idx = 0;

async function load() {
  try {
    const res = await fetch('content/posts.json');
    posts = await res.json();
    idx = +(localStorage.getItem('idx') || 0) % posts.length;
    render();
  } catch (e) {
    document.getElementById('postTitle').textContent =
      'Sin conexión — contenido disponible offline tras la primera carga.';
  }
}

function render() {
  const p = posts[idx];
  if (!p) return;

  document.getElementById('postTitle').textContent = p.title;
  document.getElementById('postImg').src = p.image;
  document.getElementById('affirmation').textContent = p.affirmation;
  document.getElementById('cta').textContent = p.cta;

  localStorage.setItem('idx', idx);
}

// Navegación entre frases
document.getElementById('prevBtn').onclick = () => {
  idx = (idx - 1 + posts.length) % posts.length;
  render();
};

document.getElementById('nextBtn').onclick = () => {
  idx = (idx + 1) % posts.length;
  render();
};

// -----------------------------
//     BOTÓN DE COMPARTIR FIX
// -----------------------------
document.getElementById('shareBtn').onclick = async () => {
  const p = posts[idx];
  if (!p) {
    alert('Aún no hay contenido cargado para compartir 💛');
    return;
  }

  const text = `${p.title} — ${p.affirmation}\n${p.cta}\nby Airmid Áurea Fit`;

  try {
    // 1) Compartir nativo
    if (navigator.share) {
      await navigator.share({
        title: 'Airmid Áurea Fit',
        text,
        url: location.href
      });
      return;
    }

    // 2) Copia automática si no hay share
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      alert('Texto copiado para compartir ✨');
      return;
    }

    // 3) Último recurso
    prompt('Copia y comparte este texto:', text);

  } catch (e) {
    console.error(e);
    alert('No se pudo compartir, pero puedes copiar el texto manualmente 💛');
  }
};

// -----------------------------
//     PWA — INSTALACIÓN
// -----------------------------
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'inline-block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;
  document.getElementById('installBtn').style.display = 'none';
});

// -----------------------------
//  SERVICE WORKER — MODO OFFLINE
// -----------------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}

// Iniciar carga
load();
