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

  /* La barra de arriba se marca un poco más al bajar. */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => { nav.style.boxShadow = scrollY > 20 ? '0 12px 40px -18px rgba(29,31,28,.45)' : ''; }, { passive: true });
})();
