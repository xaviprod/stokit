/* bulx.es · el panal en invierno (20/11/2026)

   La decoración de Navidad, entera, vive en esta carpeta. Este fichero la
   monta sobre la página tal cual está; `navidad.css` la viste. Lo que hace
   y por qué está contado en la cabecera de `navidad.css`.

   CUÁNDO SE VE
   · ENCENDIDA = false  → solo con `?navidad` en la dirección (para probar).
     Se recuerda mientras dure la pestaña, así que las subpáginas la heredan.
     `?navidad=no` la quita. `&dia=12` finge que hoy es 12 de diciembre.
   · ENCENDIDA = true   → sola, del 1 de diciembre al 6 de enero.
   El botón del copo (abajo a la izquierda) la apaga para quien no la quiera,
   y se acuerda en ese navegador. */
(function () {
  const ENCENDIDA = true;      // 20/11/2026, Xavi: «lo podemos subir ya»

  /* ── ¿Toca? ─────────────────────────────────────────────────────────── */
  const q = new URLSearchParams(location.search);
  let prueba = null;
  try {
    if (q.get('navidad') === 'no') sessionStorage.removeItem('bulxNavidadPrueba');
    else if (q.has('navidad')) sessionStorage.setItem('bulxNavidadPrueba', q.get('dia') || '12');
    prueba = sessionStorage.getItem('bulxNavidadPrueba');
  } catch (e) { if (q.has('navidad') && q.get('navidad') !== 'no') prueba = q.get('dia') || '12'; }
  const ahora = new Date(), mes = ahora.getMonth(), diaMes = ahora.getDate();
  const enFechas = mes === 11 || (mes === 0 && diaMes <= 6);
  if (!(prueba || (ENCENDIDA && enFechas))) return;

  /* El día del adviento: 1…24 en diciembre; 25 = ya están todas abiertas. */
  let DIA = prueba ? Number(prueba) || 12 : (mes === 11 ? diaMes : 25);
  DIA = Math.max(1, Math.min(25, DIA));

  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const raiz = document.documentElement;
  const base = (document.currentScript && document.currentScript.src || '/navidad/navidad.js').replace(/navidad\.js.*$/, '');

  /* ── Los textos, en los tres idiomas de la portada ──────────────────── */
  const T = {
    es: {
      quitar: 'Quitar la decoración de Navidad', poner: 'Poner la decoración de Navidad',
      trineo: 'T-01 · Trineo', reparto: 'Reparto nocturno', fiestas: 'Felices fiestas y buen fin de rodaje',
      advEtq: 'Diciembre en Bulx', advTit: 'Un panal de adviento: <span class="gris">una función cada día.</span>',
      advSub: 'Del 1 al 24 de diciembre se abre una celda con algo que Bulx ya hace. Las celdas abiertas se pueden volver a consultar.',
      fecha: d => `${d} de diciembre`, abre: d => `Se abre el ${d} de diciembre.`, cerrada: 'Todavía cerrada', ver: 'Más sobre esto',
      finTit: 'Felices fiestas.', finTxt: 'Las 24 celdas quedan abiertas hasta el 6 de enero.', celda: d => `Día ${d}`,
    },
    en: {
      quitar: 'Remove the Christmas decoration', poner: 'Show the Christmas decoration',
      trineo: 'T-01 · Sleigh', reparto: 'Night delivery', fiestas: 'Happy holidays, and that’s a wrap',
      advEtq: 'December at Bulx', advTit: 'An advent honeycomb: <span class="gris">one feature a day.</span>',
      advSub: 'From 1 to 24 December a cell opens with something Bulx already does. Open cells can be revisited.',
      fecha: d => `${d} December`, abre: d => `Opens on ${d} December.`, cerrada: 'Still closed', ver: 'More about this',
      finTit: 'Happy holidays.', finTxt: 'All 24 cells stay open until 6 January.', celda: d => `Day ${d}`,
    },
    de: {
      quitar: 'Weihnachtsdekoration ausblenden', poner: 'Weihnachtsdekoration einblenden',
      trineo: 'T-01 · Schlitten', reparto: 'Nachtzustellung', fiestas: 'Frohe Feiertage und guten Drehschluss',
      advEtq: 'Dezember bei Bulx', advTit: 'Eine Adventswabe: <span class="gris">jeden Tag eine Funktion.</span>',
      advSub: 'Vom 1. bis 24. Dezember öffnet sich eine Zelle mit etwas, das Bulx bereits kann. Offene Zellen lassen sich erneut ansehen.',
      fecha: d => `${d}. Dezember`, abre: d => `Öffnet sich am ${d}. Dezember.`, cerrada: 'Noch geschlossen', ver: 'Mehr dazu',
      finTit: 'Frohe Feiertage.', finTxt: 'Alle 24 Zellen bleiben bis zum 6. Januar offen.', celda: d => `Tag ${d}`,
    },
  };
  /* Las 24 celdas: [subpágina, es, en, de], cada idioma [título, texto]. */
  const CELDAS = [
    ['material', ['Etiquetas QR', 'Cada artículo, caja y vehículo lleva una etiqueta. Al escanearla con un móvil se abre su ficha y se registra el movimiento.'], ['QR labels', 'Every item, case and vehicle carries a label. Scanning it with a phone opens its record and logs the movement.'], ['QR-Etiketten', 'Jeder Artikel, jede Kiste und jedes Fahrzeug trägt ein Etikett. Ein Scan mit dem Handy öffnet das Datenblatt und erfasst die Bewegung.']],
    ['material', ['Kits con su contenido', 'Un kit es una ficha que contiene otras. Sale y vuelve como una unidad, y en la devolución se comprueba qué falta.'], ['Kits and their contents', 'A kit is a record that contains others. It goes out and comes back as one unit, and on return what is missing is checked.'], ['Kits mit Inhalt', 'Ein Kit ist ein Datenblatt, das andere enthält. Es geht als Einheit raus und kommt so zurück; bei der Rückgabe wird geprüft, was fehlt.']],
    ['material', ['Medidas y peso', 'Largo, ancho, alto y peso de cada caja. El volumen y el peso del transporte se calculan antes de cargar.'], ['Dimensions and weight', 'Length, width, height and weight of each case. Transport volume and weight are calculated before loading.'], ['Maße und Gewicht', 'Länge, Breite, Höhe und Gewicht jeder Kiste. Volumen und Gewicht des Transports werden vor dem Laden berechnet.']],
    ['flota', ['Calendario de reservas', 'Un vehículo por fila y las reservas por proyecto. Dos reservas de un mismo vehículo no pueden solaparse.'], ['Booking calendar', 'One vehicle per row, bookings by project. Two bookings of the same vehicle cannot overlap.'], ['Reservierungskalender', 'Ein Fahrzeug pro Zeile, Reservierungen nach Projekt. Zwei Reservierungen desselben Fahrzeugs können sich nicht überschneiden.']],
    ['flota', ['Avisos de ITV y seguro', 'Cada vehículo guarda sus fechas de vencimiento. Los avisos llegan con antelación y la cita queda anotada.'], ['MOT and insurance reminders', 'Each vehicle keeps its expiry dates. Reminders arrive in advance and the appointment is recorded.'], ['TÜV- und Versicherungserinnerungen', 'Jedes Fahrzeug speichert seine Ablaufdaten. Erinnerungen kommen rechtzeitig, der Termin wird vermerkt.']],
    ['flota', ['Partes de avería', 'Se envían desde el móvil con fotos y quedan en el historial del vehículo.'], ['Breakdown reports', 'Sent from the phone with photos and kept in the vehicle’s history.'], ['Schadensmeldungen', 'Vom Handy mit Fotos gesendet und in der Fahrzeughistorie abgelegt.']],
    ['presupuestos', ['Presupuestos desde el catálogo', 'Se eligen artículos y días; los precios y los totales se calculan por departamento.'], ['Quotes from the catalogue', 'Pick items and days; prices and totals are calculated per department.'], ['Angebote aus dem Katalog', 'Artikel und Tage wählen; Preise und Summen werden pro Abteilung berechnet.']],
    ['presupuestos', ['Aceptación en línea', 'El cliente abre un enlace, acepta o pide cambios, y el material queda reservado para esas fechas.'], ['Online acceptance', 'The client opens a link, accepts or requests changes, and the gear is reserved for those dates.'], ['Online-Annahme', 'Der Kunde öffnet einen Link, nimmt an oder bittet um Änderungen; das Equipment ist für diese Termine reserviert.']],
    ['presupuestos', ['Recordatorios programados', 'Si el cliente no responde, recibe un recordatorio a los días que se hayan configurado.'], ['Scheduled reminders', 'If the client does not reply, a reminder goes out after the configured number of days.'], ['Geplante Erinnerungen', 'Antwortet der Kunde nicht, geht nach der eingestellten Anzahl Tage eine Erinnerung heraus.']],
    ['presupuestos', ['Plantillas de presupuesto', 'El documento sale con el diseño de la casa: plantillas predeterminadas o una propia.'], ['Quote templates', 'The document goes out in the company’s design: built-in templates or a custom one.'], ['Angebotsvorlagen', 'Das Dokument erscheint im Design der Firma: mit Standardvorlagen oder einer eigenen.']],
    ['tecnologia', ['Equipos asignados', 'Portátiles, móviles y monitores con su número de serie y la persona que los tiene.'], ['Assigned devices', 'Laptops, phones and monitors with their serial number and the person who has them.'], ['Zugewiesene Geräte', 'Laptops, Handys und Monitore mit Seriennummer und der Person, die sie hat.']],
    ['tecnologia', ['Líneas y routers MiFi', 'Cada línea con su operador y su titular. Los MiFi salen con un proyecto y se devuelven, como el material.'], ['Lines and MiFi routers', 'Each line with its carrier and holder. MiFi routers go out with a project and come back, like the gear.'], ['Leitungen und MiFi-Router', 'Jede Leitung mit Anbieter und Inhaber. MiFi-Router gehen mit einem Projekt raus und kommen zurück, wie das Equipment.']],
    ['tecnologia', ['Licencias', 'Plazas contratadas, personas que las usan y fecha de renovación, por fabricante.'], ['Licences', 'Seats purchased, people using them and renewal date, by vendor.'], ['Lizenzen', 'Gekaufte Plätze, nutzende Personen und Verlängerungsdatum, nach Hersteller.']],
    ['equipo', ['Horas desde el reloj', 'La entrada y la salida se registran desde el iPhone o el Apple Watch y se imputan al proyecto.'], ['Hours from the watch', 'Clock-in and clock-out are logged from the iPhone or the Apple Watch and assigned to the project.'], ['Stunden von der Uhr', 'Kommen und Gehen werden vom iPhone oder der Apple Watch erfasst und dem Projekt zugeordnet.']],
    ['equipo', ['Chat con tarjetas', 'Un mensaje puede llevar un presupuesto, un vehículo o un artículo con su estado actual.'], ['Chat with cards', 'A message can carry a quote, a vehicle or an item with its current status.'], ['Chat mit Karten', 'Eine Nachricht kann ein Angebot, ein Fahrzeug oder einen Artikel mit aktuellem Status enthalten.']],
    ['seguridad', ['Permisos por área', 'Lectura, edición o total, por persona y por área. Los importes solo los ve quien tiene permiso de Economía.'], ['Permissions by area', 'Read, edit or full, per person and per area. Amounts are only visible with Finance permission.'], ['Berechtigungen nach Bereich', 'Lesen, Bearbeiten oder Voll, pro Person und Bereich. Beträge sieht nur, wer die Finanz-Berechtigung hat.']],
    ['seguridad', ['Registro de actividad', 'Cada cambio queda registrado con la persona, la acción y la fecha.'], ['Activity log', 'Every change is recorded with the person, the action and the date.'], ['Aktivitätsprotokoll', 'Jede Änderung wird mit Person, Aktion und Datum erfasst.']],
    ['seguridad', ['Verificación en dos pasos', 'Un código además de la contraseña, por correo o con una app de autenticación.'], ['Two-step verification', 'A code in addition to the password, by email or from an authenticator app.'], ['Zwei-Faktor-Prüfung', 'Ein Code zusätzlich zum Passwort, per E-Mail oder aus einer Authenticator-App.']],
    ['economia', ['Economía por mes', 'Importes presupuestados, aceptados y contabilizados, por proyecto, cliente y mes.'], ['Finance by month', 'Quoted, accepted and invoiced amounts, by project, client and month.'], ['Finanzen nach Monat', 'Angebotene, angenommene und verbuchte Beträge, nach Projekt, Kunde und Monat.']],
    ['economia', ['Informe en Excel', 'Un libro con las pestañas y los gráficos ya construidos.'], ['Excel report', 'A workbook with the sheets and charts already built.'], ['Excel-Bericht', 'Eine Arbeitsmappe mit fertigen Blättern und Diagrammen.']],
    ['economia', ['Power BI', 'Los cuadros de mando leen los datos de Bulx en directo, sin exportar.'], ['Power BI', 'Dashboards read Bulx data live, with no export.'], ['Power BI', 'Dashboards lesen die Bulx-Daten live, ohne Export.']],
    ['app', ['App para iPhone y iPad', 'Escanear, reservar y consultar el material, la flota y los proyectos desde el almacén o el plató.'], ['App for iPhone and iPad', 'Scan, book and check gear, fleet and projects from the warehouse or the set.'], ['App für iPhone und iPad', 'Scannen, reservieren und Equipment, Fuhrpark und Projekte prüfen, vom Lager oder vom Set aus.']],
    ['app', ['Widgets', 'Vehículos libres, material fuera y horas del día en la pantalla de inicio.'], ['Widgets', 'Free vehicles, gear out and today’s hours on the home screen.'], ['Widgets', 'Freie Fahrzeuge, ausgegebenes Equipment und Tagesstunden auf dem Home-Bildschirm.']],
    ['', ['Objetivos del año', 'Objetivos con hitos, medida y diario para planificar el año que empieza.'], ['Goals for the year', 'Goals with milestones, a measure and a journal to plan the year ahead.'], ['Jahresziele', 'Ziele mit Meilensteinen, Messgröße und Tagebuch, um das kommende Jahr zu planen.']],
  ];
  const idioma = () => (T[raiz.lang] ? raiz.lang : 'es');
  const t = () => T[idioma()];
  const COPO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5M12 6l-2.2-2M12 6l2.2-2M12 18l-2.2 2M12 18l2.2 2M6.8 9l-3-.6M6.8 9l-.9-2.9M17.2 15l3 .6M17.2 15l.9 2.9M6.8 15l-3 .6M6.8 15l-.9 2.9M17.2 9l3-.6M17.2 9l.9-2.9"/></svg>';

  /* ── El interruptor: siempre, esté puesta o quitada ─────────────────── */
  let apagada = false;
  try { apagada = localStorage.getItem('bulxNavidad') === 'no'; } catch (e) {}
  function interruptor() {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'nv-interruptor' + (apagada ? ' apagado' : ''); b.innerHTML = COPO;
    const rotulo = () => { const s = apagada ? t().poner : t().quitar; b.title = s; b.setAttribute('aria-label', s); };
    rotulo(); b.setAttribute('aria-pressed', String(!apagada));
    b.addEventListener('click', () => { try { localStorage.setItem('bulxNavidad', apagada ? 'si' : 'no'); } catch (e) {} location.reload(); });
    document.body.appendChild(b);
    document.addEventListener('bulx:idioma', rotulo);
  }

  function montar() {
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = base + 'navidad.css';
    document.head.appendChild(css);
    interruptor();
    if (apagada) return;
    raiz.classList.add('navidad');
    const noches = [...document.querySelectorAll('.hero-tarjeta, .final')];
    css.addEventListener('load', () => {
      noches.forEach(n => { nieve(n); guirnalda(n); });
      colgar(); cornisa(); trineo(); fiestas(); adviento();
    });
  }

  /* Un azar con semilla: el dibujo no cambia cada vez que se redimensiona. */
  function azar(semilla) { let a = semilla >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }

  /* ── La nieve: cristales de seis brazos, como una celda ─────────────── */
  function cristal(mitad, rnd, dpr) {
    const c = document.createElement('canvas'); const lado = Math.ceil(mitad * 2 * dpr) + 4; c.width = c.height = lado;
    const x = c.getContext('2d'); x.translate(lado / 2, lado / 2); x.scale(dpr, dpr);
    x.strokeStyle = '#FBFBFB'; x.lineCap = 'round'; x.lineWidth = Math.max(.9, mitad / 9);
    const L = mitad * .94, ramas = [[.36 + rnd() * .12, .2 + rnd() * .16]];
    if (rnd() < .8) ramas.push([.62 + rnd() * .12, .14 + rnd() * .14]);
    if (mitad > 9 && rnd() < .5) ramas.push([.84 + rnd() * .06, .08 + rnd() * .06]);
    const nucleo = rnd() < .45 ? L * (.16 + rnd() * .1) : 0;
    for (let k = 0; k < 6; k++) {
      x.save(); x.rotate(Math.PI / 3 * k); x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -L);
      ramas.forEach(([a, l]) => { const y = -L * a, dx = L * l * .866, dy = L * l * .5; x.moveTo(0, y); x.lineTo(dx, y - dy); x.moveTo(0, y); x.lineTo(-dx, y - dy); });
      x.stroke(); x.restore();
    }
    if (nucleo) { x.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; x[k ? 'lineTo' : 'moveTo'](nucleo * Math.cos(a), nucleo * Math.sin(a)); } x.closePath(); x.stroke(); }
    return c;
  }
  function nieve(tarjeta) {
    const panal = tarjeta.querySelector('svg');
    const lienzo = document.createElement('canvas'); lienzo.className = 'nv-nieve'; lienzo.setAttribute('aria-hidden', 'true');
    if (panal) panal.after(lienzo); else tarjeta.prepend(lienzo);
    const ctx = lienzo.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1), rnd = azar(20261225);
    const moldes = [5, 6, 7, 8, 9, 10, 11, 12, 9, 7].map(m => ({ mitad: m, img: cristal(m, rnd, dpr) }));
    let w = 0, h = 0, copos = [], viento = 0, ultX = null, visible = true, anterior = 0, pedido = 0;
    function nuevo(arriba) {
      const fondo = Math.random();                       // 0 = lejos, 1 = cerca
      const esCristal = Math.random() < .42;
      return {
        x: Math.random() * w, y: arriba ? -20 : Math.random() * h, fondo,
        molde: esCristal ? moldes[Math.floor(Math.random() * moldes.length)] : null,
        r: 1 + fondo * 1.6, vy: 14 + fondo * 30, fase: Math.random() * 6.28, vaiven: 8 + Math.random() * 16,
        giro: Math.random() * 6.28, vGiro: (Math.random() - .5) * .7, alfa: .22 + fondo * .6,
      };
    }
    function medir() {
      w = tarjeta.clientWidth; h = tarjeta.clientHeight;
      lienzo.width = Math.round(w * dpr); lienzo.height = Math.round(h * dpr);
      const cuantos = Math.min(110, Math.round(w * h / 9000));
      copos = Array.from({ length: cuantos }, () => nuevo(false));
      if (quieto) pintar(0);
    }
    function pintar(dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      viento *= .965;
      for (const c of copos) {
        c.fase += dt * .9; c.giro += c.vGiro * dt;
        c.y += c.vy * dt; c.x += (Math.sin(c.fase) * c.vaiven + viento * (.4 + c.fondo)) * dt;
        if (c.y > h + 24) Object.assign(c, nuevo(true));
        if (c.x < -24) c.x = w + 20; else if (c.x > w + 24) c.x = -20;
        ctx.globalAlpha = c.alfa;
        if (c.molde) {
          const m = c.molde.mitad * (.7 + c.fondo * .6);
          ctx.setTransform(dpr, 0, 0, dpr, c.x * dpr, c.y * dpr); ctx.rotate(c.giro);
          ctx.drawImage(c.molde.img, -m, -m, m * 2, m * 2);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        } else { ctx.fillStyle = '#FBFBFB'; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.2832); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    }
    function paso(ahora) {
      pedido = 0;
      const dt = Math.min(.05, (ahora - anterior) / 1000 || 0); anterior = ahora;
      pintar(dt);
      if (visible && !document.hidden) pedido = requestAnimationFrame(paso);
    }
    const arrancar = () => { if (!quieto && !pedido && visible && !document.hidden) { anterior = performance.now(); pedido = requestAnimationFrame(paso); } };
    medir();
    if ('ResizeObserver' in window) { let espera; new ResizeObserver(() => { clearTimeout(espera); espera = setTimeout(() => { if (tarjeta.clientWidth !== w || tarjeta.clientHeight !== h) medir(); }, 150); }).observe(tarjeta); }
    if (quieto) return;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; arrancar(); }).observe(tarjeta);
    document.addEventListener('visibilitychange', arrancar);
    /* El ratón hace de viento: los copos se van hacia donde se mueve. */
    tarjeta.addEventListener('pointermove', (e) => { if (ultX != null) viento = Math.max(-140, Math.min(140, viento + (e.clientX - ultX) * 1.4)); ultX = e.clientX; });
    tarjeta.addEventListener('pointerleave', () => { ultX = null; });
    arrancar();
  }

  /* ── La guirnalda de bombillas, colgada del borde de arriba ─────────── */
  function guirnalda(tarjeta) {
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'nv-guirnalda'); svg.setAttribute('aria-hidden', 'true');
    tarjeta.appendChild(svg);
    const COLORES = ['#FEC833', '#FFF4D6', '#FEC833', '#F2B705', '#FFF4D6'];
    function dibujar() {
      const w = tarjeta.clientWidth, rnd = azar(1224);
      const aire = parseFloat(getComputedStyle(tarjeta).paddingTop) || 48;
      const caida = Math.max(8, Math.min(36, aire - 30));   // lo que cuelga el centro de cada tramo
      const tramos = Math.max(2, Math.round(w / 300)), porTramo = w < 640 ? 4 : 5, paso = (w + 24) / tramos;
      svg.setAttribute('viewBox', `0 0 ${w} 110`);
      let cable = '', luces = '', n = 0;
      for (let i = 0; i < tramos; i++) {
        const x0 = -12 + paso * i, x1 = x0 + paso, cy = caida * (1.75 + rnd() * .5);
        cable += `M${x0.toFixed(1)} -2Q${((x0 + x1) / 2).toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} -2`;
        for (let k = 0; k < porTramo; k++, n++) {
          const u = (k + .5) / porTramo;
          const x = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * (x0 + x1) / 2 + u * u * x1;
          const y = (1 - u) * (1 - u) * -2 + 2 * (1 - u) * u * cy + u * u * -2;
          const color = COLORES[n % COLORES.length];
          luces += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><rect class="nv-casquillo" x="-3" y="0" width="6" height="5.5" rx="1.3"/>` +
            `<g class="nv-luz" style="--t:${(2.6 + rnd() * 2.6).toFixed(2)}s;--r:-${(rnd() * 4).toFixed(2)}s"><circle class="nv-halo" cy="12" r="12" fill="${color}"/><ellipse cy="12" rx="5.4" ry="7" fill="${color}"/></g></g>`;
        }
      }
      svg.innerHTML = `<path class="nv-cable" d="${cable}"/>${luces}`;
    }
    dibujar();
    let ancho = tarjeta.clientWidth, espera;
    window.addEventListener('resize', () => { clearTimeout(espera); espera = setTimeout(() => { if (tarjeta.clientWidth !== ancho) { ancho = tarjeta.clientWidth; dibujar(); } }, 150); });
  }

  /* ── Las tres celdas del logo, colgadas de un hilo ──────────────────── */
  function colgar() {
    const grupo = document.querySelector('.hero-celdas'), tarjeta = grupo && grupo.closest('.hero-tarjeta');
    if (!grupo || !tarjeta) return;
    const hilo = document.createElement('i'); hilo.className = 'nv-hilo';
    function medir() {
      const celdas = [...grupo.querySelectorAll('.celda')]; if (!celdas.length) return;
      const alta = celdas.reduce((a, b) => (b.offsetTop < a.offsetTop ? b : a));
      if (hilo.parentElement !== alta.parentElement) alta.parentElement.appendChild(hilo);
      const x = alta.offsetLeft + alta.offsetWidth / 2, y = alta.offsetTop;
      const hasta = grupo.getBoundingClientRect().top - tarjeta.getBoundingClientRect().top + y;
      grupo.style.setProperty('--nv-x', x + 'px'); grupo.style.setProperty('--nv-y', y + 'px');
      grupo.style.setProperty('--nv-largo', Math.round(hasta + 140) + 'px');
      grupo.style.setProperty('--nv-px', x + 'px'); grupo.style.setProperty('--nv-py', Math.round(y - hasta) + 'px');
    }
    medir(); grupo.classList.add('nv-colgadas');
    let espera; window.addEventListener('resize', () => { clearTimeout(espera); espera = setTimeout(medir, 200); });
  }

  /* ── La nieve posada sobre la ventana del producto ──────────────────── */
  function cornisa() {
    const ventana = document.getElementById('ventana'); if (!ventana) return;
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'nv-cornisa'); svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('preserveAspectRatio', 'none');
    ventana.appendChild(svg);
    function dibujar() {
      const w = ventana.clientWidth, rnd = azar(606), H = 30, borde = 22;
      svg.setAttribute('viewBox', `0 0 ${w} ${H}`);
      /* La línea de arriba: montículos suaves entre los dos cantos redondos. */
      const pts = [[borde, H - 2]];
      for (let x = borde + 22; x < w - borde - 22; x += 30 + rnd() * 34) pts.push([x, H - (7 + rnd() * 19)]);
      pts.push([w - borde, H - 2]);
      let d = `M${borde - 6} ${H + 2}L${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; d += `Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`; }
      d += `L${w - borde + 6} ${H + 2}`;
      /* Y por debajo, dos o tres colgantes que rebasan el canto. */
      const colgantes = Math.max(2, Math.round(w / 330)); let xs = [];
      for (let i = 0; i < colgantes; i++) xs.push(w - borde - 40 - (w - borde * 2 - 80) * ((i + .25 + rnd() * .5) / colgantes));
      xs.sort((a, b) => b - a).forEach(x => { const a = 9 + rnd() * 9, p = 5 + rnd() * 6; d += `L${(x + a).toFixed(1)} ${H + 2}Q${(x + a * .6).toFixed(1)} ${H + 2 + p} ${x.toFixed(1)} ${H + 2 + p}Q${(x - a * .6).toFixed(1)} ${H + 2 + p} ${(x - a).toFixed(1)} ${H + 2}`; });
      svg.innerHTML = `<path d="${d}Z"/>`;
    }
    dibujar();
    let ancho = ventana.clientWidth, espera;
    window.addEventListener('resize', () => { clearTimeout(espera); espera = setTimeout(() => { if (ventana.clientWidth !== ancho) { ancho = ventana.clientWidth; dibujar(); } }, 150); });
  }

  /* ── El guiño: en el calendario de flota, el trineo está reservado ──── */
  function trineo() {
    const tl = document.querySelector('#ventana .v-tl'); if (!tl) return;
    const fila = document.createElement('div'); fila.className = 'v-fila nv-trineo';
    const pon = () => { fila.innerHTML = `<span>${t().trineo}</span><i class="b amarillo" style="--d:2;--l:3">${t().reparto}</i>`; };
    pon(); tl.appendChild(fila); document.addEventListener('bulx:idioma', pon);
  }

  /* ── La felicitación, en la tarjeta del final ───────────────────────── */
  function fiestas() {
    const texto = document.querySelector('.final .final-texto'); if (!texto) return;
    const p = document.createElement('p'); p.className = 'nv-fiestas';
    const pon = () => { p.innerHTML = COPO + `<span>${t().fiestas}</span>`; };
    pon(); const h2 = texto.querySelector('h2'); if (h2) h2.before(p); else texto.prepend(p);
    document.addEventListener('bulx:idioma', pon);
  }

  /* ── El panal de adviento (solo en la portada) ──────────────────────── */
  function adviento() {
    const cifras = document.querySelector('main#inicio > .cifras'); if (!cifras) return;
    const sec = document.createElement('section'); sec.className = 'seccion nv-adviento'; sec.id = 'adviento';
    sec.innerHTML = '<div class="seccion-cab"><p class="etiqueta"><span class="hexito"></span><span data-nv="etq"></span></p><h2 data-nv="tit"></h2><p class="seccion-sub" data-nv="sub"></p></div>' +
      '<div class="nv-adv"><div class="nv-panal" role="group"></div><div class="nv-ficha" aria-live="polite"></div></div>';
    cifras.after(sec);
    const panal = sec.querySelector('.nv-panal'), ficha = sec.querySelector('.nv-ficha');
    let elegida = Math.min(DIA, 24), final = DIA > 24;
    const botones = CELDAS.map((_, i) => {
      const d = i + 1, b = document.createElement('button'); b.type = 'button'; b.textContent = d;
      b.className = 'nv-celda ' + (d < DIA ? 'pasada' : d === DIA ? 'hoy' : 'futura');
      b.addEventListener('click', () => { elegida = d; final = false; pintar(true); });
      panal.appendChild(b); return b;
    });
    function pintar(cambio) {
      const L = t(), col = { es: 1, en: 2, de: 3 }[idioma()];
      sec.querySelector('[data-nv="etq"]').textContent = L.advEtq;
      sec.querySelector('[data-nv="tit"]').innerHTML = L.advTit;
      sec.querySelector('[data-nv="sub"]').textContent = L.advSub;
      botones.forEach((b, i) => { b.classList.toggle('elegida', !final && i + 1 === elegida); b.setAttribute('aria-label', L.celda(i + 1)); b.setAttribute('aria-pressed', String(!final && i + 1 === elegida)); });
      const num = n => `<span class="nv-ficha-num">${String(n).padStart(2, '0')}</span>`;
      if (final) {
        ficha.className = 'nv-ficha'; ficha.innerHTML = `${num(25)}<span class="nv-ficha-fecha">${L.fecha(25)}</span><h3>${L.finTit}</h3><p>${L.finTxt}</p>`;
      } else if (elegida > DIA) {
        ficha.className = 'nv-ficha cerrada'; ficha.innerHTML = `${num(elegida)}<span class="nv-ficha-fecha">${L.fecha(elegida)}</span><h3>${L.cerrada}</h3><p>${L.abre(elegida)}</p>`;
      } else {
        const c = CELDAS[elegida - 1], [titulo, txt] = c[col];
        ficha.className = 'nv-ficha';
        ficha.innerHTML = `${num(elegida)}<span class="nv-ficha-fecha">${L.fecha(elegida)}</span><h3>${titulo}</h3><p>${txt}</p>` + (c[0] ? `<a href="/${c[0]}/">${L.ver} <span aria-hidden="true">→</span></a>` : '');
      }
      if (cambio) { ficha.classList.remove('cambia'); void ficha.offsetWidth; ficha.classList.add('cambia'); }
    }
    pintar(false);
    document.addEventListener('bulx:idioma', () => pintar(false));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
