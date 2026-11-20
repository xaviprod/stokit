/* bulx.es · lo que cada página le dice a un buscador (20/11/2026).

   Xavi: «llevar el SEO de la web a otro nivel; que cualquiera que busque algo
   parecido a Bulx llegue a nuestra web». Aquí está, en un solo sitio, la
   cabecera de TODAS las páginas (portada en tres idiomas y subpáginas):
   título, descripción, canonical, hreflang, Open Graph, iconos, fuentes sin
   bloquear el pintado y datos estructurados.

   Dos cosas que conviene no olvidar:
   · «Bulx» a secas compite en los buscadores con un fondo de bolsa (BULX) y
     con un programa de criptomonedas (BullX). Por eso el título y la
     descripción dicen siempre QUÉ es: software para productoras.
   · Nada de valoraciones ni premios en los datos estructurados si no existen. */
const DOMINIO = 'https://bulx.es';
const FUENTES = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
const LOCALE = { es: 'es_ES', en: 'en_GB', de: 'de_DE' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sinEtiquetas = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/* ── Datos estructurados que se repiten ───────────────────────────────── */
const ORG = {
  '@type': 'Organization', '@id': `${DOMINIO}/#org`, name: 'Bulx', legalName: 'Bulx', url: `${DOMINIO}/`,
  logo: { '@type': 'ImageObject', url: `${DOMINIO}/img/icono-512.png`, width: 512, height: 512 },
  image: `${DOMINIO}/img/og.png`, email: 'info@bulx.es', foundingDate: '2026',
  description: 'Software de gestión para productoras audiovisuales y casas de alquiler de material: inventario con etiquetas QR, flota, presupuestos, equipo y economía.',
  address: { '@type': 'PostalAddress', addressLocality: 'Palma', addressRegion: 'Illes Balears', addressCountry: 'ES' },
  founder: { '@type': 'Person', name: 'Xavi Murillo' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'info@bulx.es', availableLanguage: ['es', 'en', 'de'] },
  knowsAbout: ['Inventario de material audiovisual', 'Alquiler de material audiovisual', 'Gestión de flota de rodaje', 'Producción audiovisual'],
};
const APP_TXT = {
  es: { d: 'Software para productoras audiovisuales y casas de alquiler: inventario de material con etiquetas QR, flota de vehículos, presupuestos de alquiler, equipo y economía. En la web y en el iPhone.',
    f: ['Inventario de material con etiquetas QR', 'Kits, medidas y peso por caja', 'Calendario de reservas de vehículos', 'Avisos de ITV y seguro', 'Presupuestos de alquiler aceptados en línea', 'Inventario informático: equipos, líneas y licencias', 'Registro de horas por proyecto', 'Informes en Excel y Power BI', 'App para iPhone, iPad y Apple Watch'], o: 'Prueba gratuita de 14 días' },
  en: { d: 'Software for production companies and rental houses: gear inventory with QR labels, vehicle fleet, rental quotes, crew and finance. On the web and on the iPhone.',
    f: ['Gear inventory with QR labels', 'Kits, dimensions and weight per case', 'Vehicle booking calendar', 'Inspection and insurance reminders', 'Rental quotes accepted online', 'IT inventory: devices, lines and licences', 'Hours logged per project', 'Excel and Power BI reports', 'App for iPhone, iPad and Apple Watch'], o: '14-day free trial' },
  de: { d: 'Software für Filmproduktionen und Verleiher: Equipment-Inventar mit QR-Etiketten, Fuhrpark, Mietangebote, Team und Finanzen. Im Web und auf dem iPhone.',
    f: ['Equipment-Inventar mit QR-Etiketten', 'Kits, Maße und Gewicht pro Kiste', 'Reservierungskalender für Fahrzeuge', 'Erinnerungen an TÜV und Versicherung', 'Online angenommene Mietangebote', 'IT-Inventar: Geräte, Leitungen und Lizenzen', 'Stundenerfassung pro Projekt', 'Berichte in Excel und Power BI', 'App für iPhone, iPad und Apple Watch'], o: '14 Tage kostenlos testen' },
};
const app = (lang = 'es') => ({
  '@type': 'SoftwareApplication', '@id': `${DOMINIO}/#app`, name: 'Bulx', alternateName: 'Bulx, software para productoras audiovisuales',
  applicationCategory: 'BusinessApplication', applicationSubCategory: 'Inventory and rental management', operatingSystem: 'Web, iOS, iPadOS, watchOS',
  description: APP_TXT[lang].d, featureList: APP_TXT[lang].f, url: `${DOMINIO}/`, image: `${DOMINIO}/img/og.png`, inLanguage: ['es', 'en', 'de'],
  publisher: { '@id': `${DOMINIO}/#org` },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: APP_TXT[lang].o, url: 'https://cuenta.bulx.es/' },
});
const web = () => ({ '@type': 'WebSite', '@id': `${DOMINIO}/#web`, url: `${DOMINIO}/`, name: 'Bulx', alternateName: 'bulx.es', inLanguage: ['es', 'en', 'de'], publisher: { '@id': `${DOMINIO}/#org` } });
const faqLd = (pares) => ({ '@type': 'FAQPage', mainEntity: pares.map(([q, a]) => ({ '@type': 'Question', name: sinEtiquetas(q), acceptedAnswer: { '@type': 'Answer', text: sinEtiquetas(a) } })) });
const ld = (grafo) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo }).replace(/</g, '\\u003c')}</script>`;

/* ── La cabecera ──────────────────────────────────────────────────────────
   ruta: '/material/'. alternos: { es: '/', en: '/en/', de: '/de/' } si la
   página existe en más de un idioma. estilos: las hojas propias, en orden. */
function cabeza({ lang = 'es', ruta, titulo, desc, alternos, grafo, estilos = ['/estilo.css', '/paginas.css'], tipo = 'website', noindex = false }) {
  const url = DOMINIO + ruta;
  const alt = alternos ? Object.entries(alternos).map(([l, r]) => `  <link rel="alternate" hreflang="${l}" href="${DOMINIO}${r}">`).join('\n') + `\n  <link rel="alternate" hreflang="x-default" href="${DOMINIO}${alternos.es}">\n` : '';
  const ogAlt = alternos ? Object.keys(alternos).filter(l => l !== lang).map(l => `  <meta property="og:locale:alternate" content="${LOCALE[l]}">`).join('\n') + '\n' : '';
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
${alt}  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
  <meta name="theme-color" content="#1D1F1C">
  <meta name="author" content="Bulx">
  <meta property="og:type" content="${tipo}">
  <meta property="og:site_name" content="Bulx">
  <meta property="og:locale" content="${LOCALE[lang]}">
${ogAlt}  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${DOMINIO}/img/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Bulx · software para productoras audiovisuales">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(titulo)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${DOMINIO}/img/og.png">
  <link rel="icon" type="image/svg+xml" href="/img/bulx-favicon.svg">
  <link rel="icon" type="image/png" sizes="192x192" href="/img/icono-192.png">
  <link rel="apple-touch-icon" href="/img/icono-180.png">
  <link rel="manifest" href="/sitio.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="${FUENTES}">
  <link rel="stylesheet" href="${FUENTES}" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="${FUENTES}"></noscript>
${estilos.map(e => `  <link rel="stylesheet" href="${e}">`).join('\n')}
  ${ld(grafo)}
</head>`;
}

/* El interior de un elemento con data-t="clave": dónde empieza y dónde acaba,
   contando las etiquetas del mismo nombre que lleve dentro. */
function interior(html, clave, atributo = 'data-t') {
  const abre = new RegExp(`<([a-z0-9]+)\\b[^>]*\\b${atributo}="${clave}"[^>]*>`, 'i').exec(html);
  if (!abre) return null;
  const etq = abre[1], ini = abre.index + abre[0].length, re = new RegExp(`<(/?)${etq}\\b[^>]*>`, 'gi');
  re.lastIndex = ini; let hondo = 1, m;
  while ((m = re.exec(html))) { hondo += m[1] ? -1 : 1; if (!hondo) return { ini, fin: m.index, desde: abre.index, hasta: m.index + m[0].length, etq }; }
  return null;
}

module.exports = { DOMINIO, LOCALE, ORG, app, web, faqLd, ld, cabeza, interior, esc, sinEtiquetas };
