/* bulx · lanzadera: el panal de fondo y un poco de vida.
   · Un panal de hexágonos muy tenue detrás del hero y de la llamada final;
     las celdas cerca del ratón se encienden en amarillo, como si el panal
     respondiera.
   · Las tarjetas suben un poco al entrar en pantalla (ya visibles en reposo).
   Todo se queda quieto con «reducir movimiento». */
(function () {
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';

  function panal(svg, { r = 34, hueco = 6 } = {}) {
    if (!svg) return;
    const caja = svg.getBoundingClientRect();
    const w = caja.width, h = caja.height;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = '';
    const R = r, alto = Math.sqrt(3) * R, pasoX = 1.5 * R + hueco * 0.866, pasoY = alto + hueco;
    const celdas = [];
    for (let col = -1, x = 0; x < w + R * 2; col++) {
      x = col * pasoX;
      for (let fila = -1; fila * pasoY < h + alto; fila++) {
        const y = fila * pasoY + (col % 2 ? pasoY / 2 : 0);
        const p = [];
        for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k; p.push((x + R * Math.cos(a)).toFixed(1) + ',' + (y + R * Math.sin(a)).toFixed(1)); }
        const pol = document.createElementNS(NS, 'polygon');
        pol.setAttribute('points', p.join(' '));
        pol.setAttribute('fill', 'rgba(251,251,251,0.025)');
        pol.setAttribute('stroke', 'rgba(251,251,251,0.05)');
        pol.setAttribute('stroke-width', '1');
        pol.style.transition = 'fill .6s ease, stroke .6s ease';
        svg.appendChild(pol);
        celdas.push({ pol, x, y });
      }
    }
    if (quieto) return;
    const padre = svg.parentElement;
    let pendiente = null;
    padre.addEventListener('pointermove', (e) => {
      const b = svg.getBoundingClientRect();
      const mx = e.clientX - b.left, my = e.clientY - b.top;
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = null;
        celdas.forEach(c => {
          const d = Math.hypot(c.x - mx, c.y - my);
          const k = Math.max(0, 1 - d / 190);
          c.pol.setAttribute('fill', k > 0 ? `rgba(254,200,51,${(0.03 + k * 0.22).toFixed(3)})` : 'rgba(251,251,251,0.025)');
          c.pol.setAttribute('stroke', k > 0 ? `rgba(254,200,51,${(0.08 + k * 0.4).toFixed(3)})` : 'rgba(251,251,251,0.05)');
        });
      });
    });
    padre.addEventListener('pointerleave', () => celdas.forEach(c => { c.pol.setAttribute('fill', 'rgba(251,251,251,0.025)'); c.pol.setAttribute('stroke', 'rgba(251,251,251,0.05)'); }));
  }

  function montar() {
    panal(document.getElementById('hero-panal'));
    panal(document.getElementById('final-panal'), { r: 40, hueco: 8 });
  }
  montar();
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(montar, 200); });

  /* Aparición: las tarjetas ya se ven; solo suben un poco al entrar. */
  if (!quieto && 'IntersectionObserver' in window) {
    const els = document.querySelectorAll('.bento .tarjeta, .pasos li, .seg-item, .app-tarjeta, .final');
    const vistos = new IntersectionObserver((es) => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('dentro'); vistos.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top > innerHeight) { el.classList.add('sube'); el.style.transitionDelay = (i % 3) * 70 + 'ms'; vistos.observe(el); }
    });
  }

  /* ── Parallax ─────────────────────────────────────────────────────────
     Cada cosa con data-par se mueve con el scroll a su propia velocidad
     (positivo, más lenta que la página; negativo, más rápida), medida desde
     el centro de la pantalla: en reposo, en su sitio. Las celdas del hero
     siguen además al ratón (data-raton = cuántos px como mucho), y la
     ventana del producto se endereza y crece al subir. Un solo bucle por
     fotograma y nada si la pestaña no se ve o se pide reducir movimiento. */
  if (!quieto) {
    const capas = [...document.querySelectorAll('[data-par]')].map(el => ({ el, v: parseFloat(el.dataset.par) || 0, y0: null }));
    const raton = [...document.querySelectorAll('[data-raton]')].map(el => ({ el, m: parseFloat(el.dataset.raton) || 0 }));
    const ventana = document.getElementById('ventana');
    let mx = 0, my = 0, rx = 0, ry = 0, pendiente = false;
    const medir = () => capas.forEach(c => { const t = c.el.style.transform; c.el.style.transform = ''; const r = c.el.getBoundingClientRect(); c.y0 = r.top + scrollY + r.height / 2; c.el.style.transform = t; });
    medir(); addEventListener('resize', () => setTimeout(medir, 220));
    addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; pedir(); }, { passive: true });
    addEventListener('scroll', () => pedir(), { passive: true });
    function pedir() { if (!pendiente) { pendiente = true; requestAnimationFrame(pinta); } }
    function pinta() {
      pendiente = false;
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      const centro = scrollY + innerHeight / 2;
      capas.forEach(c => {
        if (c.y0 == null) return;
        const d = centro - c.y0;
        if (Math.abs(d) > innerHeight * 1.6) return;   // lejos: no se toca
        let t = `translate3d(0, ${(d * c.v).toFixed(1)}px, 0)`;
        const r = raton.find(x => x.el === c.el);
        if (r) t = `translate3d(${(rx * r.m).toFixed(1)}px, ${(d * c.v + ry * r.m).toFixed(1)}px, 0)`;
        c.el.style.transform = t;
      });
      if (ventana) {
        /* De inclinada y algo pequeña a plana y a tamaño, en los primeros 500 px. */
        const k = Math.min(1, scrollY / 500);
        ventana.style.transform = `perspective(1400px) rotateX(${((1 - k) * 14).toFixed(2)}deg) scale(${(0.93 + 0.07 * k).toFixed(3)})`;
      }
      if (Math.abs(mx - rx) > 0.002 || Math.abs(my - ry) > 0.002) pedir();
    }
    pinta();

    /* Las tarjetas se inclinan un poco hacia el ratón, como una ficha que se coge. */
    document.querySelectorAll('.bento .tarjeta, .pasos li, .seg-item').forEach(el => {
      el.addEventListener('pointermove', (e) => {
        const b = el.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
        el.classList.add('inclina');
        el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; setTimeout(() => el.classList.remove('inclina'), 150); });
    });
  }

  /* La barra de arriba se marca un poco más al bajar. */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => { nav.style.boxShadow = scrollY > 20 ? '0 12px 40px -18px rgba(29,31,28,.45)' : ''; }, { passive: true });
})();
