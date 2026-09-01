#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera buscar.js a partir de los apartados REALES de las páginas.

   Se lanza desde esta carpeta:   python3 generar-indice.py

   Se GENERA y no se escribe a mano: si mañana se añade un apartado, se vuelve a
   lanzar y el buscador lo conoce. Un índice a mano se queda viejo el primer día
   y entonces el buscador miente, que es peor que no tenerlo.

   Lo único que se mantiene a mano es CLAVES: las palabras por las que la gente
   busca de verdad y que no están en ningún título. Quien no sabe cómo se llama
   una pantalla escribe lo que quiere hacer ("asignar un coche"), no su nombre.
"""
import io, re, json

PAGS = [('empezar.html','Empezar'), ('proyectos.html','Proyectos'),
        ('presupuestos.html','Presupuestos'), ('flota.html','Flota'),
        ('material.html','Material'), ('tecnologia.html','Tecnología'),
        ('personas.html','Personas'), ('sistema.html','Ajustes')]

CLAVES = {
 'empezar.html#entrar': 'login acceso contraseña usuario dirección subdominio no puedo entrar',
 'empezar.html#pestanas': 'tabs varias cosas a la vez abrir dos',
 'empezar.html#permisos': 'no veo no me aparece falta una sección oculto',
 'empezar.html#guardado': 'se pierde no guarda banda roja aviso',
 'proyectos.html#crear': 'nuevo rodaje empezar proyecto fechas cliente',
 'proyectos.html#roles': 'line producer production manager coordinator correo destinatario',
 'proyectos.html#subproyectos': 'departamento cámara iluminación segunda unidad',
 'proyectos.html#flota': 'coches del proyecto vehículos asignados días sin días',
 'proyectos.html#equipo': 'crew quién va en cada coche matriz puestos',
 'presupuestos.html#crear': 'hacer un presupuesto nuevo líneas secciones iva',
 'presupuestos.html#factura': 'facturar convertir emitir cif domicilio',
 'presupuestos.html#contabilizar': 'días de alquiler sumar inventario',
 'presupuestos.html#anular': 'borrar presupuesto eliminar factura',
 'presupuestos.html#plantillas': 'pdf diseño membrete fondo logo a3 a4',
 'presupuestos.html#economia': 'márgenes facturación embudo cifras negocio gasto',
 'flota.html#itv': 'seguro tarjeta de transporte caduca vencimiento apto no apto',
 'flota.html#salidas': 'fotos daños revisión estado combustible cuentakilómetros coche vehículo furgoneta camión antes y después',
 'flota.html#taller': 'avería reparación orden mantenimiento parado',
 'flota.html#borrar': 'baja vender vehículo sustituto',
 'material.html#inventario': 'material almacén cámara luces grip buscar código',
 'material.html#importar': 'excel subir listado plantilla exportar',
 'material.html#fichas-qr': 'etiquetas imprimir pegatinas código qr flight caja',
 'material.html#categorias': 'árbol ramas organizar clasificar',
 'tecnologia.html#it-stock': 'portátil ordenador móvil quién tiene dispositivo mac pc',
 'tecnologia.html#asignar': 'dar un portátil a alguien reasignar devolver almacén',
 'tecnologia.html#qr-publico': 'perdido encontrado etiqueta pública sin entrar',
 'tecnologia.html#m365': 'microsoft azure cuentas directorio traer empleados buzón',
 'tecnologia.html#borrar-cuenta': 'eliminar cuenta microsoft baja empleado limpieza',
 'tecnologia.html#telefonia': 'línea móvil fijo extensión pin puk sim número',
 'tecnologia.html#mifi': 'router portátil datos internet rodaje',
 'personas.html#empleados': 'plantilla trabajadores contacto departamento cargo',
 'personas.html#crew': 'usuarios dar acceso alta alguien nuevo persona entrar contraseña',
 'personas.html#permisos': 'qué puede hacer niveles lectura edición total área',
 'personas.html#capacidades': 'ver precios importar exportar enviar contabilizar ocultar importes',
 'personas.html#contrasena': 'cambiar clave olvidada resetear',
 'personas.html#quitar': 'desactivar quitar acceso se va alguien',
 'personas.html#mi-perfil': 'mi foto mis datos mis dispositivos mi material',
 'sistema.html#pantalla': 'tele pared oficina display cast reproductor clave',
 'sistema.html#numeracion': 'prefijo número de factura serie pp fa',
 'sistema.html#actividad': 'quién ha borrado historial log auditoría',
 'sistema.html#empresa': 'cif nif domicilio iban forma de pago datos fiscales',
 'sistema.html#guardado': 'no se guarda banda roja dos servidores memoria se borran cosas desaparecen se pierden datos',
 'flota.html#calendario': 'asignar coche a rodaje ocupar días conductor reservar vehículo dar un coche camión furgoneta',
 'presupuestos.html#enviar': 'mandar correo email cliente destinatario envío enviar presupuesto factura',
}

def limpiar(t):
    t = re.sub(r'<[^>]+>', ' ', t)
    t = t.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&rarr;', '→')
    return re.sub(r'\s+', ' ', t).strip()

entradas = []
for archivo, donde in PAGS:
    s = io.open(archivo, encoding='utf-8').read()
    cuerpo = s[s.index('<main class="texto">'):]
    for tr in re.split(r'(?=<h[23] id=")', cuerpo):
        m = re.match(r'<h([23]) id="([a-z0-9-]+)">(.*?)</h\1>', tr, re.S)
        if not m: continue
        ident, titulo = m.group(2), limpiar(m.group(3))
        p = re.search(r'<p[^>]*>(.*?)</p>', tr[m.end():], re.S)
        texto = limpiar(p.group(1)) if p else ''
        if len(texto) > 145: texto = texto[:142].rsplit(' ', 1)[0] + '…'
        url = archivo + '#' + ident
        entradas.append({'donde': donde, 'titulo': titulo, 'texto': texto,
                         'url': url, 'claves': CLAVES.get(url, '').split()})

CAB = """/* ═══ Índice de búsqueda de los manuales ═══
   GENERADO por generar-indice.py. No editar a mano: se pierde al regenerar.
   Cada entrada lleva `claves`, las palabras por las que se busca de verdad y
   que no están en el título; esas sí se mantienen en el generador. */
window.INDICE_MANUALES = """

io.open('buscar.js', 'w', encoding='utf-8').write(
    CAB + json.dumps(entradas, ensure_ascii=False, indent=1) + ';\n')
print('  buscar.js: %d apartados indexados' % len(entradas))
