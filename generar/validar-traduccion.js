/* bulx.es · comprueba que una traducción de las subpáginas tiene la misma
   forma que el español.   node generar/validar-traduccion.js en|de */
const fs = require('fs');
const path = require('path');
const lang = process.argv[2];
const CAB = { en: ['Code', 'Name', 'Category', 'Quantity', 'Price per day', 'Serial number', 'Location', 'Department', 'Notes'],
  de: ['Code', 'Name', 'Kategorie', 'Menge', 'Preis pro Tag', 'Seriennummer', 'Lagerort', 'Abteilung', 'Notizen'] }[lang];
if (!CAB) { console.error('uso: node generar/validar-traduccion.js en|de'); process.exit(2); }
const es = JSON.parse(fs.readFileSync(path.join(__dirname, 'para-traducir.json'), 'utf8'));
let t; try { t = JSON.parse(fs.readFileSync(path.join(__dirname, `paginas-${lang}.json`), 'utf8')); } catch (e) { console.error('No se puede leer paginas-' + lang + '.json: ' + e.message); process.exit(1); }
const fallos = [];
const forma = (a, b, donde) => {
  if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) return fallos.push(`${donde}: tiene que ser una lista de ${a.length}`); a.forEach((x, i) => forma(x, b[i], `${donde}[${i}]`)); }
  else if (a && typeof a === 'object') { if (!b || typeof b !== 'object' || Array.isArray(b)) return fallos.push(`${donde}: falta`); for (const k of Object.keys(a)) forma(a[k], b[k], `${donde}.${k}`); for (const k of Object.keys(b)) if (!(k in a)) fallos.push(`${donde}.${k}: sobra`); }
  else if (typeof a === 'string') { if (typeof b !== 'string' || !b.trim()) fallos.push(`${donde}: falta el texto`); else if ((a.match(/<em>/g) || []).length !== (b.match(/<em>/g) || []).length || (a.match(/<\/em>/g) || []).length !== (b.match(/<\/em>/g) || []).length) fallos.push(`${donde}: tiene que llevar las mismas marcas <em>…</em>`); else if (/<(?!\/?em>)/.test(b)) fallos.push(`${donde}: no puede llevar otras etiquetas`); }
  else if (typeof a === 'number') { if (b !== a) fallos.push(`${donde}: el número ${a} no se cambia`); }
};
forma(es.paginas, t.paginas, 'paginas');
forma(es.faq_general, t.faq_general, 'faq_general');
forma({ hojas: es.excel.hojas, titulo: es.excel.titulo, intro: es.excel.intro, cabecera: es.excel.cabecera, importar: es.excel.importar, columnas: es.excel.columnas }, t.excel && { hojas: t.excel.hojas, titulo: t.excel.titulo, intro: t.excel.intro, cabecera: t.excel.cabecera, importar: t.excel.importar, columnas: t.excel.columnas }, 'excel');
if (t.excel && Array.isArray(t.excel.columnas)) t.excel.columnas.forEach((c, i) => { if (c[0] !== CAB[i]) fallos.push(`excel.columnas[${i}][0]: la cabecera tiene que ser exactamente «${CAB[i]}»`); });
if (!t.excel || !Array.isArray(t.excel.ejemplos) || t.excel.ejemplos.length !== es.excel.ejemplos.length) fallos.push('excel.ejemplos: las mismas 8 filas');
else t.excel.ejemplos.forEach((f, i) => { if (f.length !== 9) fallos.push(`excel.ejemplos[${i}]: 9 celdas`); if (f[0] !== es.excel.ejemplos[i][0] || f[3] !== es.excel.ejemplos[i][3] || f[4] !== es.excel.ejemplos[i][4]) fallos.push(`excel.ejemplos[${i}]: el código, la cantidad y el precio no se cambian`); });
if (!t.mock || typeof t.mock !== 'object' || Array.isArray(t.mock)) fallos.push('mock: tiene que ser un objeto { "texto en español": "traducción" }');
else { for (const k of Object.keys(t.mock)) if (!es.mock.includes(k)) fallos.push(`mock: «${k}» no es un texto del español`); const sin = es.mock.filter(k => !(k in t.mock)); if (sin.length) fallos.push(`mock: faltan ${sin.length} textos (los que no cambian se ponen igual): ${sin.slice(0, 6).join(' | ')}…`); }
for (const [slug, p] of Object.entries(t.paginas || {})) {
  if (typeof p.titulo === 'string') { const largo = (/Bulx/.test(p.titulo) ? p.titulo : p.titulo + ' | Bulx').length; if (largo > 60) fallos.push(`paginas.${slug}.titulo: ${largo} caracteres con « | Bulx»; máximo 60`); }
  if (typeof p.desc === 'string' && (p.desc.length > 158 || p.desc.length < 100)) fallos.push(`paginas.${slug}.desc: ${p.desc.length} caracteres; entre 100 y 158`);
}
if (fallos.length) { console.error(`✗ ${fallos.length} fallos en paginas-${lang}.json:\n  ` + fallos.join('\n  ')); process.exit(1); }
console.log(`✓ paginas-${lang}.json tiene la forma correcta`);
