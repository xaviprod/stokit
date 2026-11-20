/* bulx.es · idiomas (20/11/2026).

   Cada página existe en español, inglés y alemán, cada una con su dirección
   (/material/, /en/gear-inventory/, /de/equipment-inventar/…), escritas por
   `node generar/generar.js`. El selector de arriba son tres enlaces, y la
   propia página dice en su cabecera dónde están sus otras dos versiones.

   Este guion ya no traduce nada. Solo hace tres cosas pequeñas:
   · los enlaces antiguos (bulx.es/?lang=en) llevan a la página nueva;
   · recuerda el idioma que alguien elige a mano;
   · a quien llega con el navegador en inglés o en alemán le ENSEÑA que hay
     versión en su idioma, sin cambiarle de página. Antes se cambiaba solo,
     y como el navegador de Google va en inglés, Google podía estar leyendo
     en inglés la portada española. */
(function () {
  /* Dónde está esta misma página en otro idioma: lo dice su cabecera. */
  var enOtro = function (l) { var a = document.querySelector('link[rel="alternate"][hreflang="' + l + '"]'); return a ? a.getAttribute('href') : null; };
  var aqui = document.documentElement.lang || 'es';
  var guardar = function (l) { try { localStorage.setItem('bulxIdioma', l); } catch (e) {} };
  var guardado = null; try { guardado = localStorage.getItem('bulxIdioma'); } catch (e) {}

  var q = new URLSearchParams(location.search).get('lang');
  if (q && q !== aqui && enOtro(q)) { guardar(q); location.replace(enOtro(q) + location.hash); return; }

  var selector = document.querySelector('.idioma');
  if (selector) selector.addEventListener('click', function (ev) { var a = ev.target.closest('a[hreflang]'); if (a) guardar(a.getAttribute('hreflang')); });

  if (aqui !== 'es' || guardado || !selector) return;
  var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || 'es').slice(0, 2).toLowerCase();
  if (['es', 'ca', 'gl', 'eu'].indexOf(nav) >= 0) return;
  var a = nav === 'de' ? { l: 'de', t: 'Diese Seite gibt es auch auf Deutsch', x: 'Schließen' } : { l: 'en', t: 'This page is also available in English', x: 'Close' };
  var destino = enOtro(a.l); if (!destino) return;
  var caja = document.createElement('div'); caja.className = 'idioma-aviso'; caja.lang = a.l;
  caja.innerHTML = '<a href="' + destino + '" hreflang="' + a.l + '">' + a.t + ' →</a><button type="button" aria-label="' + a.x + '">×</button>';
  caja.querySelector('a').addEventListener('click', function () { guardar(a.l); });
  caja.querySelector('button').addEventListener('click', function () { guardar('es'); caja.remove(); });
  document.body.appendChild(caja);
})();
