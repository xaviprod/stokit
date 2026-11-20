/* bulx.es · generador (21/10/2026; en tres idiomas desde el 20/11/2026)
   node generar/generar.js   → escribe todas las páginas menos la portada en
   español, que es `index.html` y se edita a mano (a esa solo le rehace la
   cabecera). Sin dependencias.

   Qué sale:
     /<slug>/                    cada página de paginas.js, en español
     /en/<slug-en>/ /de/<…>/     las mismas, con paginas-en.json y paginas-de.json
     /en/  /de/                  la portada traducida (portada.js)
     404.html · sitio.webmanifest · llms.txt · sitemap.xml · robots.txt

   Por qué un generador y no páginas sueltas: quince páginas por tres idiomas
   con la misma cabecera, el mismo menú, el mismo pie y los mismos datos
   estructurados. Cambiar el menú en un sitio y que cambie en todos.

   Si falta paginas-en.json o paginas-de.json, ese idioma se queda solo con
   la portada, como antes. */
const fs = require('fs');
const path = require('path');
const { PAGINAS, ICO } = require('./paginas');
const { ORG, app, web, faqLd, cabeza } = require('./seo');
const { generarPortadas, RUTAS, selector } = require('./portada');
const { SLUGS, TXT, FICHEROS } = require('./idiomas-paginas');

const RAIZ = path.join(__dirname, '..');
const DOMINIO = 'https://bulx.es';
const HOY = new Date().toISOString().slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ico = (nombre, cls = '') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICO[nombre] || ICO.material}</svg>`;
/* Las preguntas de la página «Preguntas» son las generales más las de las
   páginas que van antes que ella en paginas.js (las de Soluciones, no). */
const ANTES_DE_PREGUNTAS = PAGINAS.slice(0, PAGINAS.findIndex(p => p.slug === 'preguntas'));

/* ── Un idioma: sus páginas, sus direcciones y sus textos fijos ───────── */
function idioma(lang) {
  const fichero = path.join(__dirname, `paginas-${lang}.json`);
  if (lang !== 'es' && !fs.existsSync(fichero)) return null;
  let tr = null;
  if (lang !== 'es') { try { tr = JSON.parse(fs.readFileSync(fichero, 'utf8')); } catch (e) { console.warn(`  ! paginas-${lang}.json no se puede leer (${e.message}); ese idioma se queda sin subpáginas`); return null; } }
  const T = TXT[lang], pref = lang === 'es' ? '' : `/${lang}`, inicio = `${pref}/`;
  const slug = (s) => (tr ? SLUGS[lang][s] : s);
  const ruta = (s) => `${pref}/${slug(s)}/`;
  /* Las ventanitas de ejemplo: mismo dibujo, con sus textos en el idioma. */
  const ventanita = (html) => (!html || !tr ? html : html
    .replace(/>([^<>]+)</g, (m, s) => `>${tr.mock[s] !== undefined ? esc(tr.mock[s]) : s}<`)
    .replace(/<span>L<\/span><span>M<\/span><span>X<\/span><span>J<\/span><span>V<\/span><span class="finde">S<\/span><span class="finde">D<\/span>/g,
      T.dias.map((d, i) => `<span${i > 4 ? ' class="finde"' : ''}>${d}</span>`).join('')));
  const paginas = PAGINAS.map(p => {
    const q = { ...p, slugEs: p.slug, slug: slug(p.slug), ruta: ruta(p.slug) };
    if (!tr) return q;
    const t = tr.paginas[p.slug];
    Object.assign(q, { nombre: t.nombre, titulo: t.titulo, desc: t.desc, eyebrow: t.eyebrow, h1: t.h1, sub: t.sub, mock: ventanita(p.mock) });
    if (p.slug === 'preguntas') q.faq = tr.faq_general.concat(ANTES_DE_PREGUNTAS.flatMap(x => tr.paginas[x.slug].faq));
    else Object.assign(q, { cifras: t.cifras || p.cifras, bloques: p.bloques.map(([c, i], k) => [c, i, t.bloques[k][0], t.bloques[k][1]]), pasos: t.pasos || p.pasos, faq: t.faq });
    if (p.cta) q.cta = { texto: t.cta_texto, href: /\.xlsx$/.test(p.cta.href) ? `/descargas/${FICHEROS[lang]}` : `mailto:info@bulx.es?subject=${encodeURIComponent(T.asuntoDemo)}` };
    return q;
  });
  const de = (area) => paginas.filter(p => p.area === area);
  return { lang, T, pref, inicio, ruta, paginas, PRODUCTO: de('Producto'), BULX: de('Bulx'), SOLUCIONES: de('Soluciones') };
}

/* ── El menú, con el desplegable de Producto ──────────────────────────── */
const enlaces = (lista) => lista.map(p => `<a href="${p.ruta}">${esc(p.nombre)}</a>`).join('');
function menuMovil(L) {
  const { T } = L;
  return `<b>${T.producto}</b>${enlaces(L.PRODUCTO)}
        <b>${T.soluciones}</b>${enlaces(L.SOLUCIONES)}
        <b>${T.bulx}</b>${enlaces(L.BULX.filter(p => p.slugEs !== 'demo'))}<a href="/manuales/">${T.manuales}</a><a href="${L.ruta('demo')}">${T.demo}</a><a href="/entrar.html">${T.entrar}</a>`;
}
function nav(actual, L, alternos) {
  const { T } = L, aqui = (s) => (actual === s ? 'aria-current="page"' : '');
  const menu = L.PRODUCTO.map(p => `<a href="${p.ruta}" ${aqui(p.slugEs)}>${ico(p.ico)}<span><b>${esc(p.nombre)}</b><small>${esc(p.eyebrow)}</small></span></a>`).join('');
  return `<header class="nav" id="nav">
  <a class="nav-marca" href="${L.inicio}" aria-label="${T.inicio}"><img src="/img/bulx-negro-400.png" alt="Bulx" width="96" height="29"></a>
  <nav class="nav-enlaces" aria-label="${T.secciones}">
    <details class="nav-desplegable">
      <summary ${actual && L.PRODUCTO.some(p => p.slugEs === actual) ? 'class="actual"' : ''}>${T.producto} <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg></summary>
      <div class="nav-menu"><div class="nav-menu-rejilla">${menu}</div><a class="nav-menu-pie" href="${L.inicio}#producto">${T.areasPortada}</a></div>
    </details>
    <a href="${L.ruta('app')}" ${aqui('app')}>${T.app}</a>
    <a href="${L.ruta('seguridad')}" ${aqui('seguridad')}>${T.seguridad}</a>
    <a href="${L.ruta('preguntas')}" ${aqui('preguntas')}>${T.preguntas}</a>
    ${L.lang === 'es' ? `<a href="/manuales/">${T.manuales}</a>` : ''}
  </nav>
  ${alternos && Object.keys(alternos).length > 1 ? selector(L.lang, alternos) : ''}
  <div class="nav-acciones">
    <a class="btn btn-texto" href="/entrar.html">${T.entrar}</a>
    <a class="btn btn-amarillo" href="https://cuenta.bulx.es/">${T.probar}</a>
    <details class="nav-movil"><summary aria-label="${T.menu}"><i></i><i></i><i></i></summary>
      <div class="nav-movil-menu">
        ${menuMovil(L)}
      </div>
    </details>
  </div>
</header>`;
}

/* ── El pie, con todas las páginas (lo que Google convierte en sitelinks) ─ */
const columnaSoluciones = (L) => `<b>${L.T.soluciones}</b>${enlaces(L.SOLUCIONES)}`;
function pie(L) {
  const { T } = L;
  return `<footer class="pie">
  <div class="pie-marca">
    <img src="/img/bulx-negro-400.png" alt="Bulx" width="88" height="26" loading="lazy" decoding="async">
    <p>${T.lema}</p>
  </div>
  <div class="pie-cols">
    <div><b>${T.producto}</b>${enlaces(L.PRODUCTO)}</div>
    <div><b>${T.bulx}</b><a href="${L.inicio}#como">${T.comoFunciona}</a><a href="${L.inicio}#dia">${T.unDia}</a>${enlaces(L.BULX)}<a href="/manuales/">${T.manuales}</a></div>
    <div>${columnaSoluciones(L)}</div>
    <div><b>${T.legal}</b><a href="/privacidad.html">${T.privacidad}</a><a href="mailto:info@bulx.es">info@bulx.es</a><a href="/entrar.html">${T.entrar}</a></div>
  </div>
  <p class="pie-credito">${T.credito}</p>
</footer>`;
}

/* ── Datos estructurados (lo común está en seo.js) ───────────────────── */
function grafo(p, L) {
  const url = DOMINIO + p.ruta;
  const miga = [{ '@type': 'ListItem', position: 1, name: 'Bulx', item: DOMINIO + L.inicio }];
  if (p.area === 'Producto') miga.push({ '@type': 'ListItem', position: 2, name: L.T.producto, item: `${DOMINIO}${L.inicio}#producto` });
  miga.push({ '@type': 'ListItem', position: miga.length + 1, name: p.nombre, item: url });
  const g = [ORG, app(L.lang), web(),
    { '@type': 'WebPage', '@id': url, url, name: p.titulo, description: p.desc, inLanguage: L.lang, isPartOf: { '@id': `${DOMINIO}/#web` }, about: { '@id': `${DOMINIO}/#app` }, breadcrumb: { '@id': `${url}#miga` }, primaryImageOfPage: `${DOMINIO}/img/og.png` },
    { '@type': 'BreadcrumbList', '@id': `${url}#miga`, itemListElement: miga },
  ];
  if (p.faq && p.faq.length) g.push(faqLd(p.faq));
  return g;
}
const tituloDe = (p) => (/Bulx/.test(p.titulo) ? p.titulo : `${p.titulo} | Bulx`);
const GUIONES = '<script src="/vida.js" defer></script>\n<script src="/idiomas.js" defer></script>\n<script src="/navidad/navidad.js" defer></script>';

/* ── La página ────────────────────────────────────────────────────────── */
function pagina(p, L, alternos) {
  const { T } = L;
  const hermanas = L.PRODUCTO.filter(x => x.slugEs !== p.slugEs && (p.area === 'Producto' || x.slugEs !== 'app'));
  const conHermanas = p.area === 'Producto' || p.area === 'Soluciones';
  const colores = { blanca: 'tarjeta-blanca', negra: 'tarjeta-negra', amarilla: 'tarjeta-amarilla', gris: 'tarjeta-gris' };
  const icoCls = { blanca: '', negra: 'oscuro', amarilla: 'negro', gris: '' };
  const cta = p.cta || { texto: T.demo, href: L.ruta('demo') };
  return `<!doctype html>
<html lang="${L.lang}">
${cabeza({ lang: L.lang, ruta: p.ruta, titulo: tituloDe(p), desc: p.desc, grafo: grafo(p, L), alternos: Object.keys(alternos).length > 1 ? alternos : null })}
<body class="subpagina">
${nav(p.slugEs, L, alternos)}
<main>
  <nav class="miga" aria-label="${T.estasEn}"><a href="${L.inicio}">Bulx</a><span>›</span>${p.area === 'Producto' ? `<a href="${L.inicio}#producto">${T.producto}</a><span>›</span>` : ''}<b>${esc(p.nombre)}</b></nav>

  <section class="hero pagina-hero">
    <div class="tarjeta tarjeta-negra hero-tarjeta ${p.mock ? '' : 'sin-mock'}">
      <svg class="hero-panal" data-panal aria-hidden="true"></svg>
      <div class="hero-texto">
        <p class="etiqueta etiqueta-oscura"><span class="hexito"></span>${esc(p.eyebrow)}</p>
        <h1>${p.h1}</h1>
        <p class="hero-sub">${esc(p.sub)}</p>
        <div class="hero-ctas">
          <a class="btn btn-amarillo btn-grande" href="${cta.href}"${/\.xlsx$/.test(cta.href) ? ' download' : ''}>${esc(cta.texto)} <span aria-hidden="true">→</span></a>
          ${p.slugEs === 'demo' ? `<a class="btn btn-claro btn-grande" href="${L.inicio}#dia">${T.verDia}</a>` : `<a class="btn btn-claro btn-grande" href="/manuales/">${T.verManuales}</a>`}
        </div>
      </div>
      ${p.mock ? `<div class="hero-mock">${p.mock}</div>` : ''}
    </div>
  </section>

  ${p.cifras ? `<section class="cifras" aria-label="${T.enCifras}">
    <div class="cifras-fila tres">${p.cifras.map(([n, t], i) => `<div class="cifra ${i === 2 ? 'amarilla' : ''}"><b>${esc(n)}</b><span>${esc(t)}</span></div>`).join('')}</div>
  </section>` : ''}

  ${p.bloques.length ? `<section class="seccion" id="que-hace">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>${T.queHace}</p>
      <h2>${T.enDetalle(esc(p.nombre))}</h2>
    </div>
    <div class="bento rejilla-bloques">${p.bloques.map(([c, i, t, d]) => `<article class="tarjeta ${colores[c]} bloque"><div class="hex-ico ${icoCls[c]}">${ico(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
  </section>` : ''}

  ${p.pasos ? `<section class="seccion" id="como">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>${T.comoEmpieza}</p>
      <h2>${T.tresPasos}</h2>
    </div>
    <ol class="pasos">${p.pasos.map(([t, d], i) => `<li class="tarjeta tarjeta-blanca"><span class="paso-num"><svg viewBox="-1 -1 2 2"><polygon points="-1,0 -.5,-.866 .5,-.866 1,0 .5,.866 -.5,.866"/></svg><b>${i + 1}</b></span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
  </section>` : ''}

  ${p.faq && p.faq.length ? `<section class="seccion" id="preguntas">
    <div class="preguntas">
      <div class="seccion-cab izq">
        <p class="etiqueta"><span class="hexito"></span>${T.preguntas}</p>
        <h2>${p.slugEs === 'preguntas' ? T.faqTodas : T.faqTit}</h2>
        <p class="seccion-sub">${T.faqSub} <a href="mailto:info@bulx.es">info@bulx.es</a>.</p>
      </div>
      <div class="faq">${p.faq.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
    </div>
  </section>` : ''}

  ${hermanas.length && conHermanas ? `<section class="seccion" id="otras">
    <div class="seccion-cab">
      <p class="etiqueta"><span class="hexito"></span>${p.area === 'Soluciones' ? T.areas : T.otras}</p>
      <h2>${p.area === 'Soluciones' ? T.cadaParte : T.conectadas}</h2>
    </div>
    <div class="celdas-hermanas${hermanas.length === 6 ? ' seis' : ''}">${hermanas.map(h => `<a class="tarjeta tarjeta-blanca hermana" href="${h.ruta}"><div class="hex-ico">${ico(h.ico)}</div><b>${esc(h.nombre)}</b><small>${esc(h.eyebrow)}</small><span aria-hidden="true">→</span></a>`).join('')}</div>
  </section>` : ''}

  <section class="seccion" id="demo">
    <div class="tarjeta tarjeta-negra final">
      <svg class="final-panal" data-panal data-r="40" aria-hidden="true"></svg>
      <div class="final-texto">
        <img src="/img/bulx-blanco-400.png" alt="Bulx" width="210" height="63" loading="lazy" decoding="async">
        <h2>${T.finalTit}</h2>
        <p>${T.finalTxt}</p>
        <div class="hero-ctas">
          <a class="btn btn-amarillo btn-grande" href="https://cuenta.bulx.es/">${T.probar14} <span aria-hidden="true">→</span></a>
          <a class="btn btn-claro btn-grande" href="mailto:info@bulx.es?subject=${encodeURIComponent(T.asuntoDemo)}">${T.demo}</a>
          <a class="btn btn-claro btn-grande" href="/entrar.html">${T.yaCliente}</a>
        </div>
      </div>
    </div>
  </section>
</main>
${pie(L)}
${GUIONES}
</body>
</html>
`;
}

/* ── La página que sale cuando una dirección no existe (solo en español:
      el servidor enseña la misma para cualquier dirección) ─────────────── */
function noExiste(L) {
  return `<!doctype html>
<html lang="es">
${cabeza({ ruta: '/404.html', titulo: 'Página no encontrada | Bulx', desc: 'Esta dirección no existe en bulx.es.', grafo: [ORG, web()], noindex: true })}
<body class="subpagina">
${nav('', L)}
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
          <a class="btn btn-claro btn-grande" href="/en/">English</a>
          <a class="btn btn-claro btn-grande" href="/de/">Deutsch</a>
        </div>
      </div>
    </div>
  </section>
  <section class="seccion">
    <div class="celdas-hermanas seis">${L.PRODUCTO.filter(p => p.slugEs !== 'app').map(h => `<a class="tarjeta tarjeta-blanca hermana" href="${h.ruta}"><div class="hex-ico">${ico(h.ico)}</div><b>${esc(h.nombre)}</b><small>${esc(h.eyebrow)}</small><span aria-hidden="true">→</span></a>`).join('')}</div>
  </section>
</main>
${pie(L)}
<script src="/vida.js" defer></script>
</body>
</html>
`;
}

/* ── Escribir ─────────────────────────────────────────────────────────── */
const L = {}; for (const lang of ['es', 'en', 'de']) { const x = idioma(lang); if (x) L[lang] = x; }
const LANGS = Object.keys(L);
const alternosDe = (i) => Object.fromEntries(LANGS.map(l => [l, L[l].paginas[i].ruta]));
PAGINAS.forEach((_, i) => {
  const alternos = alternosDe(i);
  for (const lang of LANGS) {
    const p = L[lang].paginas[i], dir = path.join(RAIZ, p.ruta);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(p, L[lang], alternos));
  }
  console.log('  ✓ ' + LANGS.map(l => L[l].paginas[i].ruta).join('  '));
});
generarPortadas(Object.fromEntries(LANGS.filter(l => l !== 'es').map(l => [l, {
  rutas: Object.fromEntries(L[l].paginas.map(p => [p.slugEs, p.ruta])), menuMovil: menuMovil(L[l]), soluciones: columnaSoluciones(L[l]),
}])));
fs.writeFileSync(path.join(RAIZ, '404.html'), noExiste(L.es));

/* El manifiesto: nombre, color e iconos para quien fija la web en el móvil. */
fs.writeFileSync(path.join(RAIZ, 'sitio.webmanifest'), JSON.stringify({
  name: 'Bulx · Software para productoras audiovisuales', short_name: 'Bulx', lang: 'es', start_url: '/', display: 'browser',
  background_color: '#1D1F1C', theme_color: '#1D1F1C',
  icons: [{ src: '/img/icono-192.png', sizes: '192x192', type: 'image/png' }, { src: '/img/icono-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');

/* llms.txt: lo mismo que el sitemap, contado para los asistentes de IA que
   contestan «¿qué programa hay para…?» leyendo la web. */
const linea = (p) => `- [${p.titulo}](${DOMINIO}${p.ruta}): ${p.desc}`;
const otros = LANGS.filter(l => l !== 'es');
fs.writeFileSync(path.join(RAIZ, 'llms.txt'), `# Bulx

> Bulx es un software de gestión para productoras audiovisuales y casas de alquiler de material: inventario de material con etiquetas QR, flota de vehículos de rodaje, presupuestos de alquiler aceptados en línea, inventario informático, equipo y economía. Funciona en el navegador y tiene app para iPhone, iPad y Apple Watch. Se desarrolló en 2026 dentro de Palma Pictures, productora de Mallorca (España), y se ofrece a otras productoras. Web en español, inglés (${DOMINIO}/en/) y alemán (${DOMINIO}/de/).

No confundir con BULX (un fondo cotizado de bolsa) ni con BullX (una herramienta de criptomonedas): Bulx, en bulx.es, es un programa para productoras audiovisuales.

## Producto
${L.es.PRODUCTO.map(linea).join('\n')}

## Para qué se usa
${L.es.SOLUCIONES.map(linea).join('\n')}

## Sobre Bulx
${L.es.BULX.map(linea).join('\n')}
- [Manuales](${DOMINIO}/manuales/): manuales de uso de cada área, paso a paso.
${otros.map(l => `
## ${l === 'en' ? 'English' : 'Deutsch'}
${[...L[l].PRODUCTO, ...L[l].SOLUCIONES, ...L[l].BULX].map(linea).join('\n')}
`).join('')}
## Datos prácticos
- Prueba gratuita de 14 días: https://cuenta.bulx.es/
- Precio: según el volumen de material y el número de personas; se concreta en la demostración.
- Datos alojados en Frankfurt (Alemania).
- Contacto: info@bulx.es
`);

/* sitemap.xml: cada página en sus idiomas, los manuales y la privacidad. La
   fecha de cada una es la de su último cambio de verdad (la del commit; hoy
   si está sin guardar), no la del día en que se genera. */
const { execSync } = require('child_process');
const git = (c) => { try { return execSync(`git -C "${RAIZ}" ${c}`, { encoding: 'utf8' }).trim(); } catch (e) { return ''; } };
const fecha = (f) => (git(`status --porcelain -- "${f}"`) ? HOY : git(`log -1 --format=%cs -- "${f}"`) || HOY);
const xAlt = (rutas) => Object.entries(rutas).map(([l, r]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${DOMINIO}${r}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${DOMINIO}${rutas.es}"/>`;
const manuales = fs.readdirSync(path.join(RAIZ, 'manuales')).filter(f => f.endsWith('.html'));
const urls = [
  ...Object.entries(RUTAS).map(([l, r]) => ({ loc: DOMINIO + r, prio: l === 'es' ? '1.0' : '0.8', mod: fecha(`${r.slice(1)}index.html`), extra: xAlt(RUTAS) })),
  ...PAGINAS.flatMap((p0, i) => { const alt = alternosDe(i), extra = LANGS.length > 1 ? xAlt(alt) : ''; return LANGS.map(l => ({ loc: DOMINIO + alt[l], prio: p0.area === 'Bulx' ? (l === 'es' ? '0.7' : '0.5') : (l === 'es' ? '0.9' : '0.7'), mod: fecha(`${alt[l].slice(1)}index.html`), extra })); }),
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
console.log(`  ✓ 404.html, sitio.webmanifest, llms.txt, sitemap.xml (${urls.length} direcciones) y robots.txt · idiomas de las subpáginas: ${LANGS.join(', ')}`);
