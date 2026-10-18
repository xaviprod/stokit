// La lanzadera de bulx en local: http://localhost:3030
// Sin dependencias: sirve los ficheros de esta carpeta tal cual.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PUERTO = Number(process.env.PORT) || 3030;
const RAIZ = __dirname;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (ruta.endsWith('/')) ruta += 'index.html';
  const fichero = path.normalize(path.join(RAIZ, ruta));
  if (!fichero.startsWith(RAIZ) || path.basename(fichero) === 'servir.js') { res.writeHead(404); return res.end('No existe'); }
  fs.readFile(fichero, (err, datos) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('No existe'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(fichero)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(datos);
  });
}).listen(PUERTO, () => console.log(`bulx · lanzadera en http://localhost:${PUERTO}`));
