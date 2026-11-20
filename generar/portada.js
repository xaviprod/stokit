/* bulx.es · la portada, en tres idiomas y en tres direcciones (20/11/2026).

   `index.html` es la portada en español y es lo que se edita a mano. De ella
   salen, al generar:
     /            la misma, con la cabecera de SEO rehecha y el selector de idioma
     /en/         en inglés   (textos de generar/traducciones.js)
     /de/         en alemán
   Cada una con su <title>, su descripción, su canonical y los hreflang que
   las enlazan entre sí.

   Por qué: hasta ahora el idioma se cambiaba con JavaScript sobre la misma
   dirección. Para un buscador solo existía bulx.es/ y, peor, el guion elegía
   idioma según el navegador: el de Google va en inglés, así que la portada
   «española» que veía Google podía ser la inglesa. */
const fs = require('fs');
const path = require('path');
const { DOMINIO, ORG, app, web, faqLd, cabeza, interior, sinEtiquetas } = require('./seo');
const T = require('./traducciones');

const RAIZ = path.join(__dirname, '..');
const RUTAS = { es: '/', en: '/en/', de: '/de/' };
const NOMBRE = { es: 'Español', en: 'English', de: 'Deutsch' };
const BANDERA = {
  es: '<svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice"><rect width="3" height="2" fill="#AA151B"/><rect y=".5" width="3" height="1" fill="#F1BF00"/></svg>',
  en: '<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="bx-uk"><path d="M30 15h30v15zv15H30zH0V15zV0h30z"/></clipPath><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#bx-uk)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>',
  de: '<svg viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice"><rect width="5" height="3" fill="#000"/><rect y="1" width="5" height="2" fill="#D00"/><rect y="2" width="5" height="1" fill="#FFCE00"/></svg>',
};
/* Lo que no es un data-t: título, descripción y tres rótulos para lectores de pantalla. */
const ES = {
  _titulo: 'Bulx · Software de gestión para productoras audiovisuales',
  _desc: 'Bulx es el software para productoras audiovisuales: inventario de material con QR, flota de rodaje, presupuestos de alquiler y equipo. En la web y en el iPhone.',
  _secciones: 'Secciones', _ventana: 'Así se ve Bulx por dentro', _con: 'Con Bulx',
};

/* El selector: tres enlaces de verdad (antes eran botones que cambiaban el
   texto con JavaScript). La marca negra se coloca sola con data-lang. */
const selector = (lang) => `<!-- idioma:inicio --><div class="idioma" role="group" aria-label="Idioma · Language · Sprache" data-lang="${lang}"><i class="idioma-marca" aria-hidden="true"></i>${
  Object.keys(RUTAS).map(l => `<a href="${RUTAS[l]}" hreflang="${l}" lang="${l}" title="${NOMBRE[l]}"${l === lang ? ' aria-current="true"' : ''}><span class="idioma-bandera" aria-hidden="true">${BANDERA[l]}</span><span class="idioma-sigla">${l.toUpperCase()}</span></a>`).join('')
}</div><!-- idioma:fin -->`;

const absolutas = (html) => html.replace(/(\s(?:href|src))="(?!https?:|\/|#|mailto:|tel:|data:)([^"]+)"/g, '$1="/$2"');

function generarPortadas() {
  const fichero = path.join(RAIZ, 'index.html');
  let es = fs.readFileSync(fichero, 'utf8');

  /* Las preguntas de la portada, para el FAQPage de cada idioma. */
  const preguntas = [...es.matchAll(/<summary data-t="(t\d+)">([\s\S]*?)<\/summary>\s*<p data-t="(t\d+)">([\s\S]*?)<\/p>/g)].map(m => ({ q: m[1], a: m[3], qEs: m[2], aEs: m[4] }));

  const cabecera = (lang, d) => cabeza({
    lang, ruta: RUTAS[lang], titulo: d._titulo, desc: d._desc, alternos: RUTAS,
    grafo: [ORG, app(lang), web(),
      { '@type': 'WebPage', '@id': DOMINIO + RUTAS[lang], url: DOMINIO + RUTAS[lang], name: d._titulo, description: d._desc, inLanguage: lang, isPartOf: { '@id': `${DOMINIO}/#web` }, about: { '@id': `${DOMINIO}/#app` }, primaryImageOfPage: `${DOMINIO}/img/og.png` },
      faqLd(preguntas.map(p => lang === 'es' ? [p.qEs, p.aEs] : [d[p.q] || p.qEs, d[p.a] || p.aEs])),
    ],
  });
  const conSelector = (html, lang) => /<!-- idioma:inicio -->[\s\S]*?<!-- idioma:fin -->/.test(html)
    ? html.replace(/<!-- idioma:inicio -->[\s\S]*?<!-- idioma:fin -->/, selector(lang))
    : html.replace(/(\s*)<div class="nav-acciones"/, `$1${selector(lang)}$1<div class="nav-acciones"`);

  /* ── Español: la misma página, con la cabecera y el selector al día ──── */
  es = absolutas(es.replace(/<head>[\s\S]*?<\/head>/, cabecera('es', ES)));
  es = conSelector(es, 'es');
  fs.writeFileSync(fichero, es);

  /* ── Inglés y alemán ────────────────────────────────────────────────── */
  for (const lang of ['en', 'de']) {
    const d = T[lang];
    let h = es;
    for (const clave of Object.keys(d)) {
      if (clave[0] === '_') continue;
      const hueco = interior(h, clave);
      if (!hueco) { console.warn(`  ! ${lang}: no hay data-t="${clave}" en la portada`); continue; }
      h = h.slice(0, hueco.ini) + d[clave] + h.slice(hueco.fin);
    }
    /* Lo que solo tiene sentido en español (enlaces a páginas que no están traducidas). */
    for (let hueco; (hueco = interior(h, 'es', 'data-solo'));) h = h.slice(0, hueco.desde) + h.slice(hueco.hasta);
    h = h.replace(/<html lang="es">/, `<html lang="${lang}">`)
      .replace(/<head>[\s\S]*?<\/head>/, cabecera(lang, d))
      .replace(`aria-label="${ES._secciones}"`, `aria-label="${d._secciones}"`)
      .replace(`aria-label="${ES._ventana}"`, `aria-label="${d._ventana}"`)
      .replace(`alt="${ES._con}"`, `alt="${d._con}"`);
    h = conSelector(absolutas(h), lang);
    fs.mkdirSync(path.join(RAIZ, lang), { recursive: true });
    fs.writeFileSync(path.join(RAIZ, lang, 'index.html'), h);
    const faltan = [...es.matchAll(/data-t="(t\d+)"/g)].map(m => m[1]).filter(k => d[k] === undefined);
    if (faltan.length) console.log(`    (${lang}: ${faltan.length} bloques se quedan como en español: cifras, horas y nombres propios)`);
    console.log(`  ✓ /${lang}/`);
  }
  console.log('  ✓ / (cabecera y selector de idioma)');
  return { RUTAS, resumen: sinEtiquetas(ES._desc) };
}

module.exports = { generarPortadas, RUTAS };
