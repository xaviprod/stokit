/* bulx.es · generador de subpáginas (21/10/2026)
   node generar/generar.js   → escribe /<slug>/index.html para cada página de
   paginas.js, más sitemap.xml y robots.txt. Sin dependencias.

   Por qué un generador y no páginas sueltas: once páginas con la misma
   cabecera, el mismo menú desplegable, el mismo pie y los mismos datos
   estructurados. Cambiar el menú en un sitio y que cambie en todos. */
const fs = require('fs');
const path = require('path');
const { PAGINAS, ICO, FAQ_GENERAL } = require('./paginas');

const RAIZ = path.join(__dirname, '..');
const DOMINIO = 'https://bulx.es';
const HOY = new Date().toISOString().slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ico = (nombre, cls = '') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICO[nombre] || ICO.material}</svg>`;

const PRODUCTO = PAGINAS.filter(p => p.area === 'Producto');
const BULX = PAGINAS.filter(p => p.area === 'Bulx');

/* ── El menú, con el desplegable de Producto ──────────────────────────── */
function nav(actual) {
  const enlaces = PRODUCTO.map(p => `<a href="/${p.slug}/" ${actual === p.slug ? 'aria-current="page"' : ''}>${ico(p.ico)}<span><b>${esc(p.nombre)}</b><small>${esc(p.eyebrow)}</small></span></a>`).join('');
  return `<header class="nav" id="nav">
  <a class="nav-marca" href="/" aria-label="Bulx, inicio"><img src="/img/bulx-negro.png" alt="Bulx" width="96" height="29"></a>
  <nav class="nav-enlaces" aria-label="Secciones">
    <details class="nav-desplegable">
      <summary ${actual && PRODUCTO.some(p => p.slug === actual) ? 'class="actual"' : ''}>Producto <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg></summary>
      <div class="nav-menu"><div class="nav-menu-rejilla">${enlaces}</div><a class="nav-menu-pie" href="/#producto">Ver las seis celdas en la portada →</a></div>
    </details>
    <a href="/app/" ${actual === 'app' ? 'aria-current="page"' : ''}>App</a>
    <a href="/seguridad/" ${actual === 'seguridad' ? 'aria-current="page"' : ''}>Seguridad</a>
    <a href="/preguntas/" ${actual === 'preguntas' ? 'aria-current="page"' : ''}>Preguntas</a>
    <a href="/manuales/">Manuales</a>
  </nav>
  <div class="nav-acciones">
    <a class="btn btn-texto" href="/entrar.html">Entrar</a>
    <a class="btn btn-amarillo" href="/demo/">Pide una demo</a>
    <details class="nav-movil"><summary aria-label="Menú"><i></i><i></i><i></i></summary>
      <div class="nav-movil-menu">
        <b>Producto</b>${PRODUCTO.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}
        <b>Bulx</b><a href="/seguridad/">Seguridad</a><a href="/preguntas/">Preguntas</a><a href="/sobre/">Sobre Bulx</a><a href="/manuales/">Manuales</a><a href="/demo/">Pide una demo</a><a href="/entrar.html">Entrar</a>
      </div>
    </details>
  </div>
</header>`;
}

/* ── El pie, con todas las páginas (lo que Google convierte en sitelinks) ─ */
function pie() {
  return `<footer class="pie">
  <div class="pie-marca">
    <img src="/img/bulx-negro.png" alt="Bulx" width="88" height="26">
    <p>Inventario y producción para productoras. Hecho en Mallorca.</p>
  </div>
  <div class="pie-cols">
    <div><b>Producto</b>${PRODUCTO.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}</div>
    <div><b>Bulx</b><a href="/#como">Cómo funciona</a><a href="/#dia">Un día de rodaje</a>${BULX.map(p => `<a href="/${p.slug}/">${esc(p.nombre)}</a>`).join('')}<a href="/manuales/">Manuales</a></div>
    <div><b>Legal</b><a href="/privacidad.html">Privacidad</a><a href="mailto:info@stokit.es">info@stokit.es</a><a href="/entrar.html">Entrar</a></div>
  </div>
  <p class="pie-credito">© 2026 bulx.es · Logotipo diseñado por <b>Xavi Murillo</b></p>
</footer>`;
}

/* ── Datos estructurados ──────────────────────────────────────────────── */
const ORG = {
  '@type': 'Organization', '@id': `${DOMINIO}/#org`, name: 'Bulx', url: DOMINIO,
  logo: `${DOMINIO}/img/bulx-negro.png`, email: 'info@stokit.es',
  address: { '@type': 'PostalAddress', addressLocality: 'Palma', addressRegion: 'Illes Balears', addressCountry: 'ES' },
  founder: { '@type': 'Person', name: 'Xavi Murillo' },
};
const APP = {
  '@type': 'SoftwareApplication', '@id': `${DOMINIO}/#app`, name: 'Bulx',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, iOS, iPadOS, watchOS',
  description: 'Inventario de material, flota, presupuestos, tecnología y equipo para productoras audiovisuales. En la web y en el iPhone.',
  url: DOMINIO, inLanguage: 'es', publisher: { '@id': `${DOMINIO}/#org` },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Demo gratuita; precio según material y equipo' },
};
function jsonld(p) {
  const graph = [ORG, APP,
    { '@type': 'WebSite', '@id': `${DOMINIO}/#web`, url: DOMINIO, name: 'Bulx', inLanguage: 'es', publisher: { '@id': `${DOMINIO}/#org` } },
    { '@type': 'WebPage', '@id': `${DOMINIO}/${p.slug}/`, url: `${DOMINIO}/${p.slug}/`, name: p.titulo, description: p.desc, inLanguage: 'es', isPartOf: { '@id': `${DOMINIO}/#web` }, about: { '@id': `${DOMINIO}/#app` } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bulx', item: `${DOMINIO}/` },
      { '@type': 'ListItem', position: 2, name: p.area === 'Producto' ? 'Producto' : 'Bulx', item: p.area === 'Producto' ? `${DOMINIO}/#producto` : `${DOMINIO}/` },
      { '@type': 'ListItem', position: 3, name: p.nombre, item: `${DOMINIO}/${p.slug}/` },
    ] },
  ];
  if (p.faq && p.faq.length) graph.push({ '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

/* ── La página ────────────────────────────────────────────────────────── */
function pagina(p) {
  const url = `${DOMINIO}/${p.slug}/`;
  const hermanas = PRODUCTO.filter(x => x.slug !== p.slug);
  const colores = { blanca: 'tarjeta-blanca', negra: 'tarjeta-negra', amarilla: 'tarjeta-amarilla', gris: 'tarjeta-gris' };
  const icoCls = { blanca: '', negra: 'oscuro', amarilla: 'negro', gris: '' };
  const cta = p.cta || { texto: 'Pide una demo', href: '/demo/' };
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(p.titulo)} · Bulx</title>
  <meta name="description" content="${esc(p.desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#1D1F1C">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Bulx">
  <meta property="og:locale" content="es_ES">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(p.titulo)}">
  <meta property="og:description" content="${esc(p.desc)}">
  <meta property="og:image" content="${DOMINIO}/img/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.titulo)}">
  <meta name="twitter:description" content="${esc(p.desc)}">
  <meta name="twitter:image" content="${DOMINIO}/img/og.png">
  <link rel="icon" type="image/svg+xml" href="/img/bulx-favicon.svg">
  <link rel="apple-touch-icon" href="/img/bulx-icono.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/estilo.css">
  <link rel="stylesheet" href="/paginas.css">
  ${jsonld(p)}
</head>
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
          <a class="btn btn-amarillo btn-grande" href="${cta.href}">${esc(cta.texto)} <span aria-hidden="true">→</span></a>
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
      <h2>${esc(p.nombre)}, <span class="gris">celda a celda.</span></h2>
    </div>
    <div class="bento rejilla-bloques">${p.bloques.map(([c, i, t, d]) => `<article class="tarjeta ${colores[c]} bloque"><div class="hex-ico ${icoCls[c]}">${ico(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
  </section>` : ''}

  ${p.pasos ? `<section class="seccion" id="como">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>Cómo se empieza</p>
      <h2>Tres pasos, <span class="gris">y a rodar.</span></h2>
    </div>
    <ol class="pasos">${p.pasos.map(([t, d], i) => `<li class="tarjeta tarjeta-blanca"><span class="paso-num"><svg viewBox="-1 -1 2 2"><polygon points="-1,0 -.5,-.866 .5,-.866 1,0 .5,.866 -.5,.866"/></svg><b>${i + 1}</b></span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
  </section>` : ''}

  ${p.faq && p.faq.length ? `<section class="seccion" id="preguntas">
    <div class="preguntas">
      <div class="seccion-cab izq">
        <p class="etiqueta"><span class="hexito"></span>Preguntas</p>
        <h2>${p.slug === 'preguntas' ? 'Todas las preguntas, <span class="gris">con su respuesta.</span>' : 'Lo que nos preguntan <span class="gris">de esto.</span>'}</h2>
        <p class="seccion-sub">¿Falta la tuya? Escríbenos a <a href="mailto:info@stokit.es">info@stokit.es</a>.</p>
      </div>
      <div class="faq">${p.faq.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
    </div>
  </section>` : ''}

  ${hermanas.length && p.area === 'Producto' ? `<section class="seccion" id="otras">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>Las otras celdas</p>
      <h2>Todo habla <span class="gris">con todo.</span></h2>
    </div>
    <div class="celdas-hermanas">${hermanas.map(h => `<a class="tarjeta tarjeta-blanca hermana" href="/${h.slug}/"><div class="hex-ico">${ico(h.ico)}</div><b>${esc(h.nombre)}</b><small>${esc(h.eyebrow)}</small><span aria-hidden="true">→</span></a>`).join('')}</div>
  </section>` : ''}

  <section class="seccion" id="demo">
    <div class="tarjeta tarjeta-negra final">
      <svg class="final-panal" data-panal data-r="40" aria-hidden="true"></svg>
      <div class="final-texto">
        <img src="/img/bulx-blanco.png" alt="Bulx" width="210" height="63">
        <h2>¿Lo vemos con tu material?</h2>
        <p>Te enseñamos Bulx con tu propio inventario y tu flota en media hora. Sin compromiso y sin instalar nada.</p>
        <div class="hero-ctas">
          <a class="btn btn-amarillo btn-grande" href="mailto:info@stokit.es?subject=Quiero%20ver%20Bulx">Pide una demo <span aria-hidden="true">→</span></a>
          <a class="btn btn-claro btn-grande" href="/entrar.html">Ya soy cliente · Entrar</a>
        </div>
      </div>
    </div>
  </section>
</main>
${pie()}
<script src="/vida.js"></script>
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

/* sitemap.xml: la portada, las subpáginas, los manuales y la privacidad. */
const manuales = fs.readdirSync(path.join(RAIZ, 'manuales')).filter(f => f.endsWith('.html'));
const urls = [
  { loc: `${DOMINIO}/`, prio: '1.0', mod: HOY },
  ...PAGINAS.map(p => ({ loc: `${DOMINIO}/${p.slug}/`, prio: p.area === 'Producto' ? '0.9' : '0.7', mod: HOY })),
  { loc: `${DOMINIO}/manuales/`, prio: '0.6', mod: HOY },
  ...manuales.filter(f => f !== 'index.html').map(f => ({ loc: `${DOMINIO}/manuales/${f}`, prio: '0.5', mod: HOY })),
  { loc: `${DOMINIO}/privacidad.html`, prio: '0.3', mod: HOY },
];
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.mod}</lastmod><priority>${u.prio}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /entrar.html
Disallow: /generar/

Sitemap: ${DOMINIO}/sitemap.xml
`);
console.log('  ✓ sitemap.xml (' + urls.length + ' direcciones) y robots.txt');

/* El menú y el pie de la portada, para que sean el mismo que en las subpáginas. */
module.exports = { nav, pie, PAGINAS };
