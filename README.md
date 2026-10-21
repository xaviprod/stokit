# Bulx · lanzadera

La página de presentación de Bulx (el rebranding de Stokit), hecha a partir del
portfolio del logotipo de Xavi Murillo: negro #1D1F1C, amarillo #FEC833,
blanco #FBFBFB y las tres celdas del panal.

    node servir.js        # http://localhost:3030

- `index.html` · el contenido
- `estilo.css` · la marca y la maquetación
- `vida.js` · el panal del fondo (se enciende cerca del ratón) y la aparición
- `img/` · el logotipo sin fondo (negro y blanco) sacado del PDF, el icono y el favicon

## Las subpáginas (21/10/2026)

Hay una página por celda del producto (`/material/`, `/flota/`, `/presupuestos/`,
`/tecnologia/`, `/equipo/`, `/economia/`, `/app/`) y otras de la casa (`/seguridad/`,
`/preguntas/`, `/demo/`, `/sobre/`). NO se editan a mano: salen de un generador.

    node generar/generar.js      # escribe /<slug>/index.html, sitemap.xml y robots.txt

- `generar/paginas.js` · el contenido de cada página (título, descripción, hero,
  bloques, pasos, preguntas y la ventanita de ejemplo). Es lo único que se toca.
- `generar/generar.js` · la plantilla: cabecera con el SEO (canonical, Open Graph,
  datos estructurados de Organization, SoftwareApplication, Breadcrumb y FAQ),
  menú con el desplegable de Producto, miga, pie con todas las páginas.
- `paginas.css` · lo que las subpáginas añaden a `estilo.css` (el desplegable, el
  menú del móvil, la miga, las ventanitas, las celdas hermanas).
- `img/og.png` · la imagen de 1200×630 para compartir. Sale de `generar/og.svg`
  (QuickLook la rasteriza: ver el guion en la memoria de Claude, «web-lanzadera»).

La portada (`index.html`) lleva el mismo menú y el mismo pie escritos a mano,
porque sus textos van por `idiomas.js` (español, inglés y alemán). Las subpáginas
van solo en castellano.

Para rehacer `img/og.png` (QuickLook no respeta el alto del SVG, así que se
rasteriza en un lienzo cuadrado con el diseño centrado y se recorta el centro):

    python3 -c "t=open('generar/og.svg').read();t=t.replace('width=\"1200\" height=\"630\" viewBox=\"0 0 1200 630\">','width=\"1200\" height=\"1200\" viewBox=\"0 0 1200 1200\"><g transform=\"translate(0,285)\">',1).replace('</svg>','</g></svg>');open('/tmp/og-c.svg','w').write(t)"
    qlmanage -t -s 1200 -o /tmp /tmp/og-c.svg && sips -c 630 1200 /tmp/og-c.svg.png --out img/og.png
