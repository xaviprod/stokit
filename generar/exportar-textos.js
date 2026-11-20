/* bulx.es · saca a un JSON todo el texto de las subpáginas que hay que
   traducir (20/11/2026).   node generar/exportar-textos.js
   Lo que sale (generar/para-traducir.json) tiene la MISMA forma que tienen
   que tener generar/paginas-en.json y generar/paginas-de.json. */
const fs = require('fs');
const path = require('path');
const { PAGINAS, FAQ_GENERAL } = require('./paginas');
const { COLUMNAS, EJEMPLOS, TEXTOS } = require('./plantilla-excel');

const paginas = {};
for (const p of PAGINAS) {
  const t = { nombre: p.nombre, titulo: p.titulo, desc: p.desc, eyebrow: p.eyebrow, h1: p.h1, sub: p.sub };
  if (p.slug !== 'preguntas') {
    if (p.cifras) t.cifras = p.cifras;
    t.bloques = p.bloques.map(([, , titulo, texto]) => [titulo, texto]);
    if (p.pasos) t.pasos = p.pasos;
    t.faq = p.faq;
    if (p.cta) t.cta_texto = p.cta.texto;
  }
  paginas[p.slug] = t;
}
/* Los textos de las ventanitas de ejemplo: cada trozo de texto, una vez. */
const mock = [...new Set(PAGINAS.flatMap(p => (p.mock ? [...p.mock.matchAll(/>([^<>]+)</g)].map(m => m[1]) : [])))].filter(s => /[a-záéíóúñ]{2}/i.test(s));
const excel = { hojas: TEXTOS.hojas, titulo: TEXTOS.titulo, intro: TEXTOS.intro, cabecera: TEXTOS.cabecera, importar: TEXTOS.importar, columnas: COLUMNAS.map(([n, , d]) => [n, d]), ejemplos: EJEMPLOS };
fs.writeFileSync(path.join(__dirname, 'para-traducir.json'), JSON.stringify({ paginas, faq_general: FAQ_GENERAL, mock, excel }, null, 1) + '\n');
console.log('  ✓ generar/para-traducir.json ·', Object.keys(paginas).length, 'páginas,', mock.length, 'textos de ventanitas');
