/* Las páginas de texto de bulx.es: el panal de la cabecera (el mismo que el
   de la portada, con las celdas que se encienden cerca del ratón), el índice
   que marca dónde vas y la barra de arriba que se marca al bajar.
   Todo se queda quieto con «reducir movimiento». */
(function () {
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const LISO = ['rgba(251,251,251,0.025)', 'rgba(251,251,251,0.05)'];

  function panal(svg) {
    if (!svg) return;
    const { width: w, height: h } = svg.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = '';
    const R = 34, hueco = 6, alto = Math.sqrt(3) * R, pasoX = 1.5 * R + hueco * 0.866, pasoY = alto + hueco;
    const celdas = [];
    for (let col = -1; col * pasoX < w + R * 2; col++) {
      const x = col * pasoX;
      for (let fila = -1; fila * pasoY < h + alto; fila++) {
        const y = fila * pasoY + (col % 2 ? pasoY / 2 : 0);
        const p = [];
        for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k; p.push((x + R * Math.cos(a)).toFixed(1) + ',' + (y + R * Math.sin(a)).toFixed(1)); }
        const pol = document.createElementNS(NS, 'polygon');
        pol.setAttribute('points', p.join(' '));
        pol.setAttribute('fill', LISO[0]); pol.setAttribute('stroke', LISO[1]); pol.setAttribute('stroke-width', '1');
        pol.style.transition = 'fill .6s ease, stroke .6s ease';
        svg.appendChild(pol);
        celdas.push({ pol, x, y });
      }
    }
    if (quieto) return;
    const padre = svg.parentElement;
    let pendiente = null;
    padre.onpointermove = (e) => {
      const b = svg.getBoundingClientRect(), mx = e.clientX - b.left, my = e.clientY - b.top;
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = null;
        celdas.forEach(c => {
          const k = Math.max(0, 1 - Math.hypot(c.x - mx, c.y - my) / 190);
          c.pol.setAttribute('fill', k > 0 ? `rgba(254,200,51,${(0.03 + k * 0.22).toFixed(3)})` : LISO[0]);
          c.pol.setAttribute('stroke', k > 0 ? `rgba(254,200,51,${(0.08 + k * 0.4).toFixed(3)})` : LISO[1]);
        });
      });
    };
    padre.onpointerleave = () => celdas.forEach(c => { c.pol.setAttribute('fill', LISO[0]); c.pol.setAttribute('stroke', LISO[1]); });
  }
  const montar = () => document.querySelectorAll('.hero-panal').forEach(panal);
  montar();
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(montar, 200); });

  /* El índice: se marca el apartado que se está leyendo. */
  const enlaces = [...document.querySelectorAll('.doc-indice a')];
  const porId = new Map(enlaces.map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window && enlaces.length) {
    const io = new IntersectionObserver((vistos) => {
      vistos.filter(v => v.isIntersecting).forEach(v => {
        enlaces.forEach(a => a.classList.remove('activo'));
        const a = porId.get(v.target.id); if (a) a.classList.add('activo');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    porId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  const nav = document.getElementById('nav');
  if (nav) addEventListener('scroll', () => { nav.style.boxShadow = scrollY > 20 ? '0 12px 40px -18px rgba(29,31,28,.45)' : ''; }, { passive: true });
})();
