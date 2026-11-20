/* bulx.es · generador de subpáginas (21/10/2026)
   node generar/generar.js   → escribe /<slug>/index.html para cada página de
   paginas.js, más sitemap.xml y robots.txt. Sin dependencias.

   Por qué un generador y no páginas sueltas: once páginas con la misma
   cabecera, el mismo menú desplegable, el mismo pie y los mismos datos
   estructurados. Cambiar el menú en un sitio y que cambie en todos. */
const fs = require('fs');
const path = require('path');
const { PAGINAS, ICO, FAQ_GENERAL } = require('./paginas');
const { ORG, app, web, faqLd, cabeza } = require('./seo');
const { generarPortadas, RUTAS } = require('./portada');

const RAIZ = path.join(__dirname, '..');
const DOMINIO = 'https://bulx.es';
const HOY = new Date().toISOString().slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ico = (nombre, cls = '') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICO[nombre] || ICO.material}</svg>`;

const PRODUCTO = PAGINAS.filter(p => p.area === 'Producto');
const BULX = PAGINAS.filter(p => p.area === 'Bulx');
const SOLUCIONES = PAGINAS.filter(p => p.area === 'Soluciones');

/* ── El menú, con el desplegable de Producto ──────────────────────────── */
function nav(actual) {
  const enlaces = PRODUCTO.map(p => `<a href="/${p.slug}/" ${actual === p.slug ? 'aria-current="page"' : ''}>${ico(p.ico)}<span><b>${esc(p.nombre)}</b><small>${esc(p.eyebrow)}</small></span></a>`).join('');
  return `<header class="nav" id="nav">
  <a class="nav-marca" href="/" aria-label="Bulx, inicio"><img src="/img/bulx-negro-400.png" alt="Bulx" width="96" height="29"></a>
  <nav class="nav-enlaces" aria-label="Secciones">
    <details class="nav-desplegable">
      <summary ${actual && PRODUCTO.some(p => p.slug === actual) ? 'class="actual"' : ''}>Producto <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg></summary>
      <div class="nav-menu"><div class="nav-menu-rejilla">${enlaces}</div><a class="nav-menu-pie" href="/#producto">Las seis áreas, en la portada →</a></div>
    </details>
    <a href="/app/" ${actual === 'app' ? 'aria-current="page"' : ''}>App</a>
    <a href="/seguridad/" ${actual === 'seguridad' ? 'aria-current="page"' : ''}>Seguridad</a>
    <a href="/preguntas/" ${actual === 'preguntas' ? 'aria-current="page"' : ''}>Preguntas</a>
    <a href="/manuales/">Manuales</a>
  </nav>
  <div class="nav-acciones">
    <a class="btn btn-texto" href="/entrar.html">Entrar</a>
    <a class="btn btn-amarillo" href="https://cuenta.bulx.es/">Probar gratis</a>
    <details class="nav-movil"><summary aria-label="Menú"><i></i><i></i><i></i></summary>
      <div class="nav-movil-menu">
        <b>Producto</b>${PRODUCTO.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}
        <b>Soluciones</b>${SOLUCIONES.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}
        <b>Bulx</b><a href="/seguridad/">Seguridad</a><a href="/preguntas/">Preguntas</a><a href="/sobre/">Sobre Bulx</a><a href="/manuales/">Manuales</a><a href="/demo/">Solicitar una demo</a><a href="/entrar.html">Entrar</a>
      </div>
    </details>
  </div>
</header>`;
}

/* ── El pie, con todas las páginas (lo que Google convierte en sitelinks) ─ */
function pie() {
  return `<footer class="pie">
  <div class="pie-marca">
    <img src="/img/bulx-negro-400.png" alt="Bulx" width="88" height="26" loading="lazy" decoding="async">
    <p>Inventario y producción para productoras. Desarrollado en Mallorca.</p>
  </div>
  <div class="pie-cols">
    <div><b>Producto</b>${PRODUCTO.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}</div>
    <div><b>Bulx</b><a href="/#como">Cómo funciona</a><a href="/#dia">Un día de rodaje</a>${BULX.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}<a href="/manuales/">Manuales</a></div>
    <div><b>Soluciones</b>${SOLUCIONES.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}</div>
    <div><b>Legal</b><a href="/privacidad.html">Privacidad</a><a href="mailto:info@bulx.es">info@bulx.es</a><a href="/entrar.html">Entrar</a></div>
  </div>
  <p class="pie-credito">© 2026 bulx.es · Logotipo diseñado por <b>Xavi Murillo</b></p>
</footer>`;
}

/* ── Datos estructurados (lo común está en seo.js) ───────────────────── */
function grafo(p) {
  const url = `${DOMINIO}/${p.slug}/`;
  const miga = [{ '@type': 'ListItem', position: 1, name: 'Bulx', item: `${DOMINIO}/` }];
  if (p.area === 'Producto') miga.push({ '@type': 'ListItem', position: 2, name: 'Producto', item: `${DOMINIO}/#producto` });
  miga.push({ '@type': 'ListItem', position: miga.length + 1, name: p.nombre, item: url });
  const g = [ORG, app('es'), web(),
    { '@type': 'WebPage', '@id': url, url, name: p.titulo, description: p.desc, inLanguage: 'es', isPartOf: { '@id': `${DOMINIO}/#web` }, about: { '@id': `${DOMINIO}/#app` }, breadcrumb: { '@id': `${url}#miga` }, primaryImageOfPage: `${DOMINIO}/img/og.png` },
    { '@type': 'BreadcrumbList', '@id': `${url}#miga`, itemListElement: miga },
  ];
  if (p.faq && p.faq.length) g.push(faqLd(p.faq));
  return g;
}
const tituloDe = (p) => (/Bulx/.test(p.titulo) ? p.titulo : `${p.titulo} | Bulx`);

/* ── La página ────────────────────────────────────────────────────────── */
function pagina(p) {
  const url = `${DOMINIO}/${p.slug}/`;
  const hermanas = PRODUCTO.filter(x => x.slug !== p.slug && (p.area === 'Producto' || x.slug !== 'app'));
  const conHermanas = p.area === 'Producto' || p.area === 'Soluciones';
  const colores = { blanca: 'tarjeta-blanca', negra: 'tarjeta-negra', amarilla: 'tarjeta-amarilla', gris: 'tarjeta-gris' };
  const icoCls = { blanca: '', negra: 'oscuro', amarilla: 'negro', gris: '' };
  const cta = p.cta || { texto: 'Solicitar una demo', href: '/demo/' };
  return `<!doctype html>
<html lang="es">
${cabeza({ ruta: `/${p.slug}/`, titulo: tituloDe(p), desc: p.desc, grafo: grafo(p) })}
<body class="subpagina">
${nav(p.slug)}
<main>
  <nav class="miga" aria-label="Estás en"><a href="/">Bulx</a><span>›</span>${p.area === 'Producto' ? '<a href="/#producto">Producto</a><span>›</span>' : ''}<b>${esc(p.nombre)}</b></nav>

  <section class="hero pagina-hero">
    <div class="tarjeta tarjeta-negra hero-tarjeta ${p.mock ? '' : 'sin-mock'}">
      <svg class="hero-panal" data-panal aria-hidden="true"></svg>
      <div class="hero-texto">
        <p class="etiqueta etiqueta-oscura"><span class="hexito"></span>${esc(p.eyebrow)}</p>
        <h1>${p.h1}</h1>
        <p class="hero-sub">${esc(p.sub)}</p>
        <div class="hero-ctas">
          <a class="btn btn-amarillo btn-grande" href="${cta.href}"${/\.xlsx$/.test(cta.href) ? ' download' : ''}>${esc(cta.texto)} <span aria-hidden="true">→</span></a>
          ${p.slug === 'demo' ? '<a class="btn btn-claro btn-grande" href="/#dia">Ver un día de rodaje</a>' : '<a class="btn btn-claro btn-grande" href="/manuales/">Ver los manuales</a>'}
        </div>
      </div>
      ${p.mock ? `<div class="hero-mock">${p.mock}</div>` : ''}
    </div>
  </section>

  ${p.cifras ? `<section class="cifras" aria-label="En cifras">
    <div class="cifras-fila tres">${p.cifras.map(([n, t], i) => `<div class="cifra ${i === 2 ? 'amarilla' : ''}"><b>${esc(n)}</b><span>${esc(t)}</span></div>`).join('')}</div>
  </section>` : ''}

  ${p.bloques.length ? `<section class="seccion" id="que-hace">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>Qué hace</p>
      <h2>${esc(p.nombre)}, <span class="gris">en detalle.</span></h2>
    </div>
    <div class="bento rejilla-bloques">${p.bloques.map(([c, i, t, d]) => `<article class="tarjeta ${colores[c]} bloque"><div class="hex-ico ${icoCls[c]}">${ico(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
  </section>` : ''}

  ${p.pasos ? `<section class="seccion" id="como">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>Cómo se empieza</p>
      <h2>Tres pasos <span class="gris">para empezar.</span></h2>
    </div>
    <ol class="pasos">${p.pasos.map(([t, d], i) => `<li class="tarjeta tarjeta-blanca"><span class="paso-num"><svg viewBox="-1 -1 2 2"><polygon points="-1,0 -.5,-.866 .5,-.866 1,0 .5,.866 -.5,.866"/></svg><b>${i + 1}</b></span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
  </section>` : ''}

  ${p.faq && p.faq.length ? `<section class="seccion" id="preguntas">
    <div class="preguntas">
      <div class="seccion-cab izq">
        <p class="etiqueta"><span class="hexito"></span>Preguntas</p>
        <h2>${p.slug === 'preguntas' ? 'Todas las preguntas, <span class="gris">por áreas.</span>' : 'Preguntas <span class="gris">frecuentes.</span>'}</h2>
        <p class="seccion-sub">Si su pregunta no está aquí, escriba a <a href="mailto:info@bulx.es">info@bulx.es</a>.</p>
      </div>
      <div class="faq">${p.faq.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
    </div>
  </section>` : ''}

  ${hermanas.length && conHermanas ? `<section class="seccion" id="otras">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>${p.area === 'Soluciones' ? 'Las áreas de Bulx' : 'Las otras áreas'}</p>
      <h2>${p.area === 'Soluciones' ? 'Cada parte, <span class="gris">en detalle.</span>' : 'Conectadas <span class="gris">entre sí.</span>'}</h2>
    </div>
    <div class="celdas-hermanas${hermanas.length === 6 ? ' seis' : ''}">${hermanas.map(h => `<a class="tarjeta tarjeta-blanca hermana" href="/${h.slug}/"><div class="hex-ico">${ico(h.ico)}</div><b>${esc(h.nombre)}</b><small>${esc(h.eyebrow)}</small><span aria-hidden="true">→</span></a>`).join('')}</div>
  </section>` : ''}

  <section class="seccion" id="demo">
    <div class="tarjeta tarjeta-negra final">
      <svg class="final-panal" data-panal data-r="40" aria-hidden="true"></svg>
      <div class="final-texto">
        <img src="/img/bulx-blanco-400.png" alt="Bulx" width="210" height="63" loading="lazy" decoding="async">
        <h2>Una demostración con su propio material.</h2>
        <p>Treinta minutos por videollamada, con su hoja de material o de vehículos. Sin compromiso y sin instalar nada.</p>
        <div class="hero-ctas">
          <a class="btn btn-amarillo btn-grande" href="https://cuenta.bulx.es/">Probar 14 días gratis <span aria-hidden="true">→</span></a>
          <a class="btn btn-claro btn-grande" href="mailto:info@bulx.es?subject=Demostraci%C3%B3n%20de%20Bulx">Solicitar una demo</a>
          <a class="btn btn-claro btn-grande" href="/entrar.html">Ya soy cliente · Entrar</a>
        </div>
      </div>
    </div>
  </section>
</main>
${pie()}
<script src="/vida.js" defer></script>
<script src="/navidad/navidad.js" defer></script>
</body>
</html>
`;
}

/* ── La página que sale cuando una dirección no existe ───────────────── */
function noExiste() {
  return `<!doctype html>
<html lang="es">
${cabeza({ ruta: '/404.html', titulo: 'Página no encontrada | Bulx', desc: 'Esta dirección no existe en bulx.es.', grafo: [ORG, web()], noindex: true })}
<body class="subpagina">
${nav('')}
<main>
  <section class="hero pagina-hero">
    <div class="tarjeta tarjeta-negra hero-tarjeta sin-mock">
      <svg class="hero-panal" data-panal aria-hidden="true"></svg>
      <div class="hero-texto">
        <p class="etiqueta etiqueta-oscura"><span class="hexito"></span>Error 404</p>
        <h1>Esta página <em>no existe.</em></h1>
        <p class="hero-sub">Puede que la dirección haya cambiado o que el enlace esté mal escrito. Estas son las páginas principales de Bulx.</p>
        <div class="hero-ctas">
          <a class="btn btn-amarillo btn-grande" href="/">Ir a la portada <span aria-hidden="true">→</span></a>
          <a class="btn btn-claro btn-grande" href="/preguntas/">Preguntas frecuentes</a>
        </div>
      </div>
    </div>
  </section>
  <section class="seccion">
    <div class="celdas-hermanas seis">${PRODUCTO.filter(p => p.slug !== 'app').map(h => `<a class="tarjeta tarjeta-blanca hermana" href="/${h.slug}/"><div class="hex-ico">${ico(h.ico)}</div><b>${esc(h.nombre)}</b><small>${esc(h.eyebrow)}</small><span aria-hidden="true">→</span></a>`).join('')}</div>
  </section>
</main>
${pie()}
<script src="/vida.js" defer></script>
</body>
</html>
`;
}

/* ── Escribir ─────────────────────────────────────────────────────────── */
for (const p of PAGINAS) {
  const dir = path.join(RAIZ, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pagina(p));
  console.log('  ✓ /' + p.slug + '/');
}
generarPortadas();
fs.writeFileSync(path.join(RAIZ, '404.html'), noExiste());

/* El manifiesto: nombre, color e iconos para quien fija la web en el móvil. */
fs.writeFileSync(path.join(RAIZ, 'sitio.webmanifest'), JSON.stringify({
  name: 'Bulx · Software para productoras audiovisuales', short_name: 'Bulx', lang: 'es', start_url: '/', display: 'browser',
  background_color: '#1D1F1C', theme_color: '#1D1F1C',
  icons: [{ src: '/img/icono-192.png', sizes: '192x192', type: 'image/png' }, { src: '/img/icono-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');

/* llms.txt: lo mismo que el sitemap, contado para los asistentes de IA que
   contestan «¿qué programa hay para…?» leyendo la web. */
const linea = (p) => `- [${p.titulo}](${DOMINIO}/${p.slug}/): ${p.desc}`;
fs.writeFileSync(path.join(RAIZ, 'llms.txt'), `# Bulx

> Bulx es un software de gestión para productoras audiovisuales y casas de alquiler de material: inventario de material con etiquetas QR, flota de vehículos de rodaje, presupuestos de alquiler aceptados en línea, inventario informático, equipo y economía. Funciona en el navegador y tiene app para iPhone, iPad y Apple Watch. Se desarrolló en 2026 dentro de Palma Pictures, productora de Mallorca (España), y se ofrece a otras productoras. Web en español, inglés (${DOMINIO}/en/) y alemán (${DOMINIO}/de/).

No confundir con BULX (un fondo cotizado de bolsa) ni con BullX (una herramienta de criptomonedas): Bulx, en bulx.es, es un programa para productoras audiovisuales.

## Producto
${PRODUCTO.map(linea).join('\n')}

## Para qué se usa
${SOLUCIONES.map(linea).join('\n')}

## Sobre Bulx
${BULX.map(linea).join('\n')}
- [Manuales](${DOMINIO}/manuales/): manuales de uso de cada área, paso a paso.

## Datos prácticos
- Prueba gratuita de 14 días: https://cuenta.bulx.es/
- Precio: según el volumen de material y el número de personas; se concreta en la demostración.
- Datos alojados en Frankfurt (Alemania).
- Contacto: info@bulx.es
`);

/* sitemap.xml: la portada en sus tres idiomas, las subpáginas, los manuales
   y la privacidad. La fecha de cada una es la de su último cambio de verdad
   (la del commit; hoy si está sin guardar), no la del día en que se genera. */
const { execSync } = require('child_process');
const git = (c) => { try { return execSync(`git -C "${RAIZ}" ${c}`, { encoding: 'utf8' }).trim(); } catch (e) { return ''; } };
const fecha = (f) => (git(`status --porcelain -- "${f}"`) ? HOY : git(`log -1 --format=%cs -- "${f}"`) || HOY);
const manuales = fs.readdirSync(path.join(RAIZ, 'manuales')).filter(f => f.endsWith('.html'));
const alternos = Object.entries(RUTAS).map(([l, r]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${DOMINIO}${r}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${DOMINIO}/"/>`;
const urls = [
  ...Object.entries(RUTAS).map(([l, r]) => ({ loc: DOMINIO + r, prio: l === 'es' ? '1.0' : '0.8', mod: fecha(l === 'es' ? 'index.html' : `${l}/index.html`), extra: alternos })),
  ...PAGINAS.map(p => ({ loc: `${DOMINIO}/${p.slug}/`, prio: p.area === 'Bulx' ? '0.7' : '0.9', mod: fecha(`${p.slug}/index.html`) })),
  { loc: `${DOMINIO}/manuales/`, prio: '0.6', mod: fecha('manuales/index.html') },
  ...manuales.filter(f => f !== 'index.html').map(f => ({ loc: `${DOMINIO}/manuales/${f}`, prio: '0.5', mod: fecha(`manuales/${f}`) })),
  { loc: `${DOMINIO}/privacidad.html`, prio: '0.3', mod: fecha('privacidad.html') },
];
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url><loc>${u.loc}</loc>${u.extra || ''}<lastmod>${u.mod}</lastmod><priority>${u.prio}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /entrar.html
Disallow: /generar/
Disallow: /404.html

Sitemap: ${DOMINIO}/sitemap.xml
`);
console.log('  ✓ 404.html, sitio.webmanifest, llms.txt, sitemap.xml (' + urls.length + ' direcciones) y robots.txt');

/* El menú y el pie de la portada, para que sean el mismo que en las subpáginas. */
module.exports = { nav, pie, PAGINAS };
