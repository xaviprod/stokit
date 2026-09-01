# Stokit · web de presentación

Página estática. No necesita servidor ni compilación.

```
index.html      la página de presentación
entrar.html     el "¿de qué empresa eres?" que lleva a su subdominio
manuales/       los manuales de la aplicación  →  stokit.es/manuales
```

## Los manuales

Viven aquí y no dentro de la aplicación, a propósito:

- **Se abren sin entrar.** Quien no puede acceder —porque le falta un permiso,
  porque no recuerda la contraseña o porque aún no tiene cuenta— es justamente
  quien más los necesita.
- **No dependen de que la aplicación funcione.** Un manual es lo que se abre
  cuando algo va mal, y no puede ser lo siguiente que va mal.
- Son públicos, así que sirven además para enseñar el producto.

Ocho páginas más la portada, con buscador. La aplicación enlaza al **apartado
exacto** desde el botón «Ayuda» de cada pantalla, así que **los anclajes (`#…`)
son una interfaz**: renombrar uno rompe ese botón en silencio.

Dos herramientas para eso, las dos sin dependencias:

```bash
cd manuales
python3 generar-indice.py      # regenera buscar.js desde los apartados reales
python3 comprobar-enlaces.py   # avisa de cualquier ancla que no exista
```

`comprobar-enlaces.py` revisa las dos direcciones: los enlaces entre manuales y
los del mapa `_AYUDA` de `public/app.js` en el repositorio de la aplicación.
Devuelve 1 si algo está roto, así que vale para un gancho de git.

**Al añadir un apartado**: ponle un `id`, añádelo al índice lateral de su página,
lanza `generar-indice.py` y después `comprobar-enlaces.py`.

## Publicar en Render

1. Subir esta carpeta a un repositorio de GitHub.
2. En Render: **New → Static Site**, elegir el repositorio.
3. Dejar **Build Command** vacío y **Publish Directory** en `.`
4. Crear. Render da una dirección `*.onrender.com`.

## Pendiente antes de enseñarla fuera

- El correo de contacto es `hola@stokit.es` y **todavía no existe**.
- El botón «Iniciar sesión» apunta a `http://localhost:3000`; hay que
  cambiarlo por la dirección real de la aplicación.
