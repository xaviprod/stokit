#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprueba que ningún enlace apunte a un ancla que no existe.

   Se lanza desde esta carpeta:   python3 comprobar-enlaces.py [ruta-de-la-app]

   POR QUÉ EXISTE. Los manuales se enlazan desde dos sitios y de dos maneras:
   entre ellos, y desde el botón «Ayuda» de cada pantalla de la aplicación. Un
   ancla que se renombra rompe los dos silenciosamente — el navegador no avisa
   de un `#` que no existe: se queda arriba de la página y quien lo pulsa piensa
   que el manual no habla de eso.

   Comprueba las dos direcciones y devuelve 1 si hay algo roto, para poder
   ponerlo en un gancho de git.
"""
import io, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
APP = sys.argv[1] if len(sys.argv) > 1 else '/Users/xavi/Documents/stock-it-palmapictures'

anclas = {}
for f in sorted(os.listdir(AQUI)):
    if f.endswith('.html'):
        s = io.open(os.path.join(AQUI, f), encoding='utf-8').read()
        anclas[f] = set(re.findall(r'id="([a-z0-9-]+)"', s))

roto = 0

print('\n  Enlaces entre manuales')
n = 0
for f in anclas:
    s = io.open(os.path.join(AQUI, f), encoding='utf-8').read()
    for href in re.findall(r'href="([a-z0-9-]+\.html#[a-z0-9-]+)"', s):
        n += 1
        a, _, an = href.partition('#')
        if a not in anclas or an not in anclas[a]:
            roto += 1; print('  ⚠ %s → %s' % (f, href))
    for an in re.findall(r'href="#([a-z0-9-]+)"', s):
        n += 1
        if an not in anclas[f]:
            roto += 1; print('  ⚠ %s → #%s' % (f, an))
print('  · %d enlaces revisados' % n)

ruta_app = os.path.join(APP, 'public', 'app.js')
if os.path.exists(ruta_app):
    print('\n  Botones de Ayuda de la aplicación')
    app = io.open(ruta_app, encoding='utf-8').read()
    try:
        i = app.index('_AYUDA: {'); j = app.index('\n  },', i)
        mapa = re.findall(r"['\"]?([a-z0-9-]+)['\"]?:\s*\['([^']+)'", app[i:j])
    except ValueError:
        mapa = []
        print('  ⚠ no se encontró el mapa _AYUDA en app.js')
        roto += 1
    for pagina, destino in mapa:
        a, _, an = destino.partition('#')
        if a not in anclas or an not in anclas[a]:
            roto += 1
            print('  ⚠ %-15s → %s  (no existe)' % (pagina, destino))
    print('  · %d botones revisados' % len(mapa))
else:
    print('\n  (no se encuentra la aplicación en %s; se omite esa parte)' % APP)

print('\n  %s\n' % ('⚠ %d enlace(s) roto(s)' % roto if roto else '✓ Ningún enlace roto.'))
sys.exit(1 if roto else 0)
