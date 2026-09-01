/* ═══════════════════════════════════════════════════════════════════════════
   Stokit · manuales — lo poco que necesita moverse

   Tres cosas, y ninguna imprescindible: la página se lee entera con JavaScript
   apagado. Eso es a propósito — un manual es lo que se abre cuando algo no
   funciona, y no puede ser lo siguiente que no funcione.

     1. El tema (claro / oscuro / el del sistema).
     2. Marcar en el índice el apartado que se está leyendo.
     3. El buscador de la portada.

   Sin librerías, sin compilar. Un archivo que se puede leer de arriba abajo.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── EL TEMA ──────────────────────────────────────────────────────────────
     Tres estados y no dos. El de partida es "lo que diga el sistema", que es el
     que quiere casi todo el mundo sin saber que lo quiere: el portátil ya
     cambia solo al atardecer. En cuanto alguien pulsa, su elección manda y se
     guarda.

     Se lee de `localStorage` con try/catch porque en una ventana privada
     ACCEDER a localStorage lanza una excepción en algunos navegadores, y eso
     dejaría la página en blanco. Una preferencia de color no puede tirar un
     manual. */
  const LLAVE = 'stokit-manuales-tema';

  const leerTema = () => {
    try { return localStorage.getItem(LLAVE); } catch (e) { return null; }
  };
  const guardarTema = (v) => {
    try { v ? localStorage.setItem(LLAVE, v) : localStorage.removeItem(LLAVE); }
    catch (e) { /* sin guardar, pero la página sigue */ }
  };

  const aplicarTema = (v) => {
    if (v) document.documentElement.setAttribute('data-tema', v);
    else document.documentElement.removeAttribute('data-tema');
  };

  const guardado = leerTema();
  if (guardado) aplicarTema(guardado);

  const esOscuroAhora = () =>
    (document.documentElement.getAttribute('data-tema') || '') === 'oscuro' ||
    (!document.documentElement.hasAttribute('data-tema') &&
     window.matchMedia('(prefers-color-scheme: dark)').matches);

  const SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></svg>';
  const LUNA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';

  const boton = document.querySelector('.tema');
  const pintarBoton = () => {
    if (!boton) return;
    const oscuro = esOscuroAhora();
    boton.innerHTML = oscuro ? SOL : LUNA;
    boton.setAttribute('title', oscuro ? 'Pasar a claro' : 'Pasar a oscuro');
    boton.setAttribute('aria-label', boton.getAttribute('title'));
  };
  pintarBoton();

  if (boton) {
    boton.addEventListener('click', () => {
      const v = esOscuroAhora() ? 'claro' : 'oscuro';
      aplicarTema(v); guardarTema(v); pintarBoton();
    });
  }
  /* Si nadie ha elegido, se sigue al sistema en caliente. */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!leerTema()) pintarBoton();
  });

  /* ── DÓNDE ESTOY ──────────────────────────────────────────────────────────
     Marca en el índice el apartado que se está leyendo.

     Con `IntersectionObserver` y no escuchando el scroll: el navegador avisa
     cuando un título entra o sale, en vez de preguntar la posición de veinte
     elementos en cada uno de los cientos de eventos de scroll que dispara una
     rueda de ratón.

     El margen de arriba (-85px) descuenta la barra pegada: sin él, el apartado
     se marcaría cuando su título ya está tapado. */
  const enlaces = [...document.querySelectorAll('.indice a[href^="#"]')];
  if (enlaces.length && 'IntersectionObserver' in window) {
    const porId = new Map();
    enlaces.forEach(a => porId.set(a.getAttribute('href').slice(1), a));

    const titulos = [...porId.keys()]
      .map(id => document.getElementById(id))
      .filter(Boolean);

    let visibles = new Set();
    const marcar = () => {
      /* El primero de los visibles, en orden de documento. Si no hay ninguno
         —se está leyendo el cuerpo de un apartado largo—, se deja el último
         que estuvo. */
      const id = titulos.map(t => t.id).find(x => visibles.has(x));
      if (!id) return;
      enlaces.forEach(a => a.classList.toggle('aqui', a.getAttribute('href') === '#' + id));
    };

    const ojo = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.isIntersecting) visibles.add(e.target.id);
        else visibles.delete(e.target.id);
      });
      marcar();
    }, { rootMargin: '-85px 0px -65% 0px' });

    titulos.forEach(t => ojo.observe(t));

    /* Al llegar con un ancla en la dirección, marcarlo ya: quien viene de la
       aplicación aterriza en mitad de la página y tiene que ver dónde ha
       caído. */
    if (location.hash) {
      const a = porId.get(location.hash.slice(1));
      if (a) a.classList.add('aqui');
    }
  }

  /* ── ENLACE PROPIO DE CADA APARTADO ───────────────────────────────────────
     La aplicación enlaza a estos anclajes, así que conviene poder copiar el
     enlace exacto de un apartado sin ir al código. Se añade al pasar por
     encima del título. */
  document.querySelectorAll('.texto h2[id], .texto h3[id]').forEach(h => {
    const a = document.createElement('a');
    a.className = 'ancla';
    a.href = '#' + h.id;
    a.textContent = '#';
    a.setAttribute('aria-label', 'Enlace a «' + h.textContent.trim() + '»');
    h.appendChild(a);
  });

  /* ── EL BUSCADOR ──────────────────────────────────────────────────────────
     Solo en la portada, y solo si hay índice de búsqueda cargado.

     Se busca sin acentos y sin distinguir mayúsculas, porque nadie escribe
     "revisión" con tilde cuando tiene prisa. Y se busca también en las
     palabras sueltas de cada entrada: quien no sabe cómo se llama una pantalla
     escribe lo que quiere hacer ("dar de alta un coche"), no su nombre. */
  const caja = document.getElementById('q');
  const salida = document.getElementById('resultados');
  if (caja && salida && Array.isArray(window.INDICE_MANUALES)) {
    const pelar = t => String(t || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const entradas = window.INDICE_MANUALES.map(e => ({
      ...e,
      buscable: pelar([e.titulo, e.donde, e.texto, (e.claves || []).join(' ')].join(' ')),
    }));

    const pintar = (lista, q) => {
      if (!q) { salida.innerHTML = ''; return; }
      if (!lista.length) {
        salida.innerHTML = '<div class="r-nada">Nada con eso. Prueba con una palabra menos, ' +
          'o mira el índice de abajo.</div>';
        return;
      }
      salida.innerHTML = lista.slice(0, 8).map(e =>
        '<a href="' + e.url + '">' +
        '<div class="r-donde">' + e.donde + '</div>' +
        '<div class="r-tit">' + e.titulo + '</div>' +
        '<div class="r-txt">' + e.texto + '</div></a>').join('');
    };

    /* Palabras que no dicen nada al buscar. Se quitan porque la gente escribe
       frases: "quien tiene un portatil" no encontraba NADA solo porque la
       palabra "un" no aparece en ningún texto del manual, y se exigía que
       todas estuvieran. Con las frases naturales, exigirlo todo es exigir que
       el manual esté escrito con las mismas partículas. */
    const VACIAS = new Set(['un','una','unos','unas','el','la','los','las','de','del',
      'en','a','al','que','como','y','o','para','por','con','se','mi','me','lo','es',
      'su','sus','hay','esta','este','donde','cual','cuales','quiero','puedo','hacer']);

    const partir = q => q.split(/\s+/).filter(t => t.length > 1 && !VACIAS.has(t));

    /* Puntúa: el título pesa más que las palabras clave, y las claves más que
       el cuerpo. Sin esto, buscar "asignar un coche" sacaba primero el apartado
       de "Cuándo se guarda" —que menciona la frase de pasada— por delante del
       calendario de flota, que es la respuesta. */
    /* POR LA RAÍZ, no por la palabra exacta. Nadie conjuga igual que el manual:
       se busca "envio" y el apartado se llama "Enviar"; se escribe "se me
       borran cosas" y el texto dice "borrar". Sin esto, "como envio un
       presupuesto" no encontraba el apartado de enviar — el fallo más tonto
       posible en un buscador de manual.

       Se recorta la palabra en lugar de conjugar de verdad: dos letras menos, y
       nunca por debajo de cuatro, que es donde empezaría a encontrar cualquier
       cosa. "enviar"→"envi", "borran"→"borr", "asignar"→"asign". */
    const raiz = t => (t.length >= 6 ? t.slice(0, t.length - 2) : t);
    const cabe = (texto, t) => texto.includes(t) || (t.length >= 6 && texto.includes(raiz(t)));

    /* La palabra ENTERA vale más que la palabra dentro de otra. Sin esto,
       "poner la tele" sacaba primero Telefonía —porque "tele" está dentro de
       "telefonía"— por delante de la pantalla de oficina, que es la respuesta.
       Y "dar de alta a alguien nuevo" sacaba "Crear un proyecto" en vez de
       Crew. */
    const palabraEntera = (texto, t) =>
      new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
                 '([^a-z0-9]|$)').test(texto);

    const puntuar = (e, trozos) => {
      const tit = pelar(e.titulo);
      const cla = pelar((e.claves || []).join(' '));
      let n = 0;
      for (const t of trozos) {
        /* Las claves con la palabra ENTERA son la señal más fuerte que hay: están
           escritas a mano, apartado por apartado, justamente para esto. Por
           encima incluso de una coincidencia en el título, que puede ser
           casualidad de la ortografía. */
        if (palabraEntera(cla, t))      n += 11;
        else if (palabraEntera(tit, t)) n += 10;
        else if (cabe(cla, t))          n += 8;
        else if (cabe(tit, t))          n += 7;
        else if (cabe(e.buscable, t))   n += 1;
      }
      /* Un título que empieza por lo buscado es casi siempre lo que se quiere. */
      if (trozos.length && tit.startsWith(trozos[0])) n += 5;
      return n;
    };

    let ultimo = '';
    caja.addEventListener('input', () => {
      const q = pelar(caja.value.trim());
      if (q === ultimo) return;
      ultimo = q;
      if (q.length < 2) { pintar([], ''); return; }

      const trozos = partir(q);
      if (!trozos.length) { pintar([], ''); return; }

      /* Basta con que aparezca UNA de las palabras que dicen algo, y se ordena
         por cuántas y dónde. Exigirlas todas deja fuera lo bueno; no exigir
         ninguna saca media web. El equilibrio está en el orden. */
      const halla = entradas
        .map(e => ({ e, n: puntuar(e, trozos) }))
        .filter(x => x.n > 0)
        .sort((a, b) => b.n - a.n)
        .map(x => x.e);

      pintar(halla, q);
    });

    /* Enter abre el primero. Es lo que espera cualquiera que haya usado un
       buscador. */
    caja.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const primero = salida.querySelector('a');
      if (primero) { e.preventDefault(); location.href = primero.href; }
    });

    /* Con `?q=algo` en la dirección se busca al entrar. Así la aplicación puede
       mandar a alguien al manual con la búsqueda ya hecha. */
    const desdeUrl = new URLSearchParams(location.search).get('q');
    if (desdeUrl) { caja.value = desdeUrl; caja.dispatchEvent(new Event('input')); }
  }
})();
