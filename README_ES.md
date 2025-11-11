# Airmid Áurea Fit — Guía de publicación rápida (Cloudflare Pages)

### 1) Crear el proyecto
1. Entra a https://dash.cloudflare.com → **Pages** → **Create a project** → **Upload assets**.
2. Sube **todo el contenido de esta carpeta** (no solo el zip interno). Puedes arrastrar y soltar.
3. Al terminar, Cloudflare te dará una URL: `https://<tu-proyecto>.pages.dev`

### 2) Conectar tu subdominio
1. En Cloudflare → **Websites** → `vivemejorhoy.net` → **DNS**.
2. Añade un registro **CNAME** con:
   - **Name:** `app`
   - **Target:** `<tu-proyecto>.pages.dev`
   - **Proxy:** Proxied (nube naranja)
3. Espera unos minutos y abre **https://app.vivemejorhoy.net**

### 3) Instalar como app (PWA)
- En iPhone (Safari/Chrome): abre la URL → **Compartir** → **Añadir a pantalla de inicio**.
- En Android (Chrome): abre la URL → banner **Instalar** o **⋮ → Añadir a la pantalla de inicio**.

### 4) Cambiar contenido (imágenes y textos)
- Tus publicaciones están en `content/posts.json`.
- Sube tus fotos a `assets/` y apunta cada post a su archivo.
- Recomendado para Instagram/TikTok: **1080×1350** o **1080×1080**.

### 5) Estructura mínima
```
index.html
styles.css
app.js
manifest.json
service-worker.js
/content/posts.json
/assets/tu-imagen-1.jpg (etc)
```

### 6) Consejos
- Mantén nombres de archivos sin espacios y en minúsculas.
- Para SEO, añade `description` en `<head>` y prueba con una **portada Open Graph** (og:image).
- Si cambias iconos, respeta `192x192` y `512x512` para el manifest.

— © 2025 Yalaikys González Rodríguez — ViveMejorHoy / Airmid Áurea