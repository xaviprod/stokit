/* bulx.es · la plantilla de inventario que se descarga en
   /plantilla-inventario-material/ (20/11/2026).

     node generar/plantilla-excel.js     → descargas/plantilla-inventario-material-rodaje.xlsx

   Las cabeceras son las que lee «Importar Excel» de Bulx (nombre, código,
   categoría con la ruta «A > B», cantidad, precio por día, número de serie,
   ubicación, departamento y notas), así que la plantilla sirve sola y también
   se importa tal cual. Las filas de ejemplo son inventadas: nombres de
   material corriente, con tarifas de muestra.

   Usa exceljs, que ya está en el proyecto de la aplicación (carpeta de arriba). */
const path = require('path');
const ExcelJS = require(path.join(__dirname, '..', '..', 'node_modules', 'exceljs'));

const TINTA = 'FF1D1F1C', AMARILLO = 'FFFEC833', SUAVE = 'FFFFF3CC', RAYA = 'FFDCDCD7';
const COLUMNAS = [
  ['Código', 14, 'Un código corto y único por artículo. Por ejemplo, tres letras del departamento y un número: CAM-0001. Es el que irá en la etiqueta.'],
  ['Nombre', 38, 'OBLIGATORIA. El nombre con el que se conoce el artículo en el almacén: marca, modelo y lo que lo distingue.'],
  ['Categoría', 30, 'La ruta completa, separada por « > »: «Iluminación > LED». Se puede usar cualquier profundidad.'],
  ['Cantidad', 11, 'Unidades de ese artículo. Para material con número de serie, una fila por unidad y cantidad 1.'],
  ['Precio por día', 15, 'Tarifa de alquiler por día, sin IVA. Se deja vacía si el artículo no se alquila.'],
  ['Número de serie', 20, 'El del fabricante. Identifica la unidad ante un seguro, una reparación o un robo.'],
  ['Ubicación', 22, 'Dónde se guarda: almacén, estantería, flight case o caja.'],
  ['Departamento', 16, 'Cámara, Iluminación, Grip, Sonido, Producción… El que se haga cargo del artículo.'],
  ['Notas', 44, 'Accesorios incluidos, estado, fecha de compra o cualquier observación.'],
];
const EJEMPLOS = [
  ['CAM-0001', 'ARRI Alexa Mini (cuerpo)', 'Cámara > Cuerpos', 1, 950, 'K1.0003873-EJEMPLO', 'Almacén 1 · Estantería A', 'Cámara', 'Con jaula y placa base. Fila de ejemplo: se puede borrar.'],
  ['CAM-0002', 'Juego de ópticas Zeiss CP.3 (5 lentes)', 'Cámara > Ópticas', 1, 300, '', 'Almacén 1 · Flight case 4', 'Cámara', '21, 28, 35, 50 y 85 mm. Fila de ejemplo.'],
  ['CAM-0003', 'Monitor de campo 17"', 'Cámara > Monitores', 2, 90, '', 'Almacén 1 · Estantería B', 'Cámara', 'Fila de ejemplo.'],
  ['LUZ-0001', 'ARRI SkyPanel S60-C', 'Iluminación > LED', 4, 120, '', 'Almacén 1 · Flight case 7', 'Iluminación', 'Cada uno con su fuente y su cable. Fila de ejemplo.'],
  ['LUZ-0002', 'Trípode Combo', 'Iluminación > Soportes', 8, 12, '', 'Almacén 1 · Carro 2', 'Iluminación', 'Fila de ejemplo.'],
  ['GRP-0001', 'Trípode Sachtler con cabeza fluida', 'Grip > Soportes', 2, 45, '', 'Almacén 1 · Estantería C', 'Grip', 'Fila de ejemplo.'],
  ['SON-0001', 'Pértiga de 3 m', 'Sonido > Accesorios', 3, 15, '', 'Almacén 2 · Caja 1', 'Sonido', 'Fila de ejemplo.'],
  ['PRO-0001', 'Walkie-talkie', 'Producción > Comunicación', 12, 8, '', 'Almacén 2 · Maleta 3', 'Producción', 'Con cargador y auricular. Fila de ejemplo.'],
];

(async () => {
  const libro = new ExcelJS.Workbook();
  libro.creator = 'Bulx · bulx.es'; libro.created = new Date(2026, 10, 20);
  const fino = { style: 'thin', color: { argb: RAYA } };

  /* ── Hoja 1: el inventario ── */
  const h = libro.addWorksheet('Inventario', { views: [{ state: 'frozen', ySplit: 1 }] });
  h.columns = COLUMNAS.map(([c, w]) => ({ header: c, width: w }));
  h.getRow(1).height = 26;
  h.getRow(1).eachCell(c => { c.font = { bold: true, color: { argb: AMARILLO }, size: 11 }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINTA } }; c.alignment = { vertical: 'middle' }; });
  EJEMPLOS.forEach(f => h.addRow(f));
  for (let r = 2; r <= 400; r++) {
    const fila = h.getRow(r);
    for (let c = 1; c <= COLUMNAS.length; c++) fila.getCell(c).border = { bottom: fino };
    fila.getCell(4).alignment = { horizontal: 'center' };
    fila.getCell(5).numFmt = '#,##0.00 "€"';
  }
  h.autoFilter = { from: 'A1', to: { row: 1, column: COLUMNAS.length } };

  /* ── Hoja 2: cómo se rellena ── */
  const c = libro.addWorksheet('Cómo se rellena');
  c.columns = [{ width: 20 }, { width: 100 }];
  c.addRow(['Plantilla de inventario de material de rodaje']).font = { bold: true, size: 16 };
  c.addRow(['Una fila por artículo en la hoja «Inventario». No hay que cambiar las cabeceras. Solo el nombre es obligatorio. Las filas de ejemplo se pueden borrar.']);
  c.addRow([]);
  const cab = c.addRow(['Columna', 'Qué se pone']);
  cab.eachCell(x => { x.font = { bold: true, color: { argb: AMARILLO } }; x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINTA } }; });
  COLUMNAS.forEach(([n, , d]) => { const f = c.addRow([n, d]); f.getCell(1).font = { bold: true }; f.getCell(2).alignment = { wrapText: true, vertical: 'top' }; f.getCell(1).alignment = { vertical: 'top' }; });
  c.addRow([]);
  const pie = c.addRow(['Importar en Bulx', 'Esta plantilla se importa tal cual en Bulx (Material › Importar Excel): crea las categorías, asigna una etiqueta QR a cada artículo y, antes de importar, enseña qué va a entrar. Más información en https://bulx.es/plantilla-inventario-material/']);
  pie.getCell(1).font = { bold: true }; pie.getCell(2).alignment = { wrapText: true, vertical: 'top' };
  pie.eachCell(x => { x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUAVE } }; });
  c.getRow(2).getCell(1).alignment = { wrapText: false };

  const destino = path.join(__dirname, '..', 'descargas', 'plantilla-inventario-material-rodaje.xlsx');
  require('fs').mkdirSync(path.dirname(destino), { recursive: true });
  await libro.xlsx.writeFile(destino);
  console.log('  ✓ ' + path.relative(path.join(__dirname, '..'), destino));
})();
