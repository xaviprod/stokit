/* bulx.es · las subpáginas en inglés y en alemán (20/11/2026).

   Xavi: «Sí, tradúcelas». Cada subpágina existe ahora tres veces, cada una
   con su dirección y enlazada con las otras dos por hreflang:
     /material/   /en/gear-inventory/   /de/equipment-inventar/

   Aquí está lo que NO es contenido de una página concreta:
   · SLUGS: cómo se llama cada dirección en cada idioma (con las palabras que
     se buscan en ese idioma, no una traducción literal);
   · TXT: los textos fijos de la plantilla (menú, pie, rótulos de sección).
   El contenido de cada página traducida está en paginas-en.json y
   paginas-de.json, con la misma forma que saca `node generar/exportar-textos.js`
   (y que comprueba `node generar/validar-traduccion.js en|de`). */
const SLUGS = {
  en: {
    material: 'gear-inventory', flota: 'fleet', presupuestos: 'rental-quotes', tecnologia: 'it-inventory', equipo: 'crew', economia: 'finance', app: 'app',
    seguridad: 'security', demo: 'demo', sobre: 'about', preguntas: 'faq',
    'software-productoras-audiovisuales': 'production-company-software', 'alquiler-material-audiovisual': 'equipment-rental-software',
    'inventario-codigos-qr': 'qr-code-inventory', 'plantilla-inventario-material': 'equipment-inventory-template',
  },
  de: {
    material: 'equipment-inventar', flota: 'fuhrpark', presupuestos: 'mietangebote', tecnologia: 'it-inventar', equipo: 'team', economia: 'finanzen', app: 'app',
    seguridad: 'sicherheit', demo: 'demo', sobre: 'ueber-bulx', preguntas: 'fragen',
    'software-productoras-audiovisuales': 'software-filmproduktion', 'alquiler-material-audiovisual': 'verleihsoftware-filmequipment',
    'inventario-codigos-qr': 'inventar-qr-codes', 'plantilla-inventario-material': 'inventar-vorlage-filmequipment',
  },
};

const TXT = {
  es: {
    inicio: 'Bulx, inicio', secciones: 'Secciones', menu: 'Menú', producto: 'Producto', soluciones: 'Soluciones', bulx: 'Bulx', legal: 'Legal',
    app: 'App', seguridad: 'Seguridad', preguntas: 'Preguntas', manuales: 'Manuales', sobre: 'Sobre Bulx', entrar: 'Entrar', probar: 'Probar gratis',
    areasPortada: 'Las seis áreas, en la portada →', comoFunciona: 'Cómo funciona', unDia: 'Un día de rodaje', privacidad: 'Privacidad',
    lema: 'Inventario y producción para productoras. Desarrollado en Mallorca.', credito: '© 2026 bulx.es · Logotipo diseñado por <b>Xavi Murillo</b>',
    estasEn: 'Estás en', enCifras: 'En cifras', demo: 'Solicitar una demo', verDia: 'Ver un día de rodaje', verManuales: 'Ver los manuales',
    queHace: 'Qué hace', enDetalle: (n) => `${n}, <span class="gris">en detalle.</span>`,
    comoEmpieza: 'Cómo se empieza', tresPasos: 'Tres pasos <span class="gris">para empezar.</span>',
    faqTit: 'Preguntas <span class="gris">frecuentes.</span>', faqTodas: 'Todas las preguntas, <span class="gris">por áreas.</span>', faqSub: 'Si su pregunta no está aquí, escriba a',
    otras: 'Las otras áreas', conectadas: 'Conectadas <span class="gris">entre sí.</span>', areas: 'Las áreas de Bulx', cadaParte: 'Cada parte, <span class="gris">en detalle.</span>',
    finalTit: 'Una demostración con su propio material.', finalTxt: 'Treinta minutos por videollamada, con su hoja de material o de vehículos. Sin compromiso y sin instalar nada.',
    probar14: 'Probar 14 días gratis', yaCliente: 'Ya soy cliente · Entrar', asuntoDemo: 'Demostración de Bulx',
    dias: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], tu: 'Tú',
  },
  en: {
    inicio: 'Bulx, home', secciones: 'Sections', menu: 'Menu', producto: 'Product', soluciones: 'Solutions', bulx: 'Bulx', legal: 'Legal',
    app: 'App', seguridad: 'Security', preguntas: 'FAQ', manuales: 'Manuals (in Spanish)', sobre: 'About Bulx', entrar: 'Log in', probar: 'Try it free',
    areasPortada: 'The six areas, on the home page →', comoFunciona: 'How it works', unDia: 'A shooting day', privacidad: 'Privacy (in Spanish)',
    lema: 'Inventory and production for production companies. Developed in Mallorca.', credito: '© 2026 bulx.es · Logo designed by <b>Xavi Murillo</b>',
    estasEn: 'You are here', enCifras: 'In figures', demo: 'Request a demo', verDia: 'See a shooting day', verManuales: 'Read the manuals (in Spanish)',
    queHace: 'What it does', enDetalle: (n) => `${n}, <span class="gris">in detail.</span>`,
    comoEmpieza: 'Getting started', tresPasos: 'Three steps <span class="gris">to get started.</span>',
    faqTit: 'Frequently asked <span class="gris">questions.</span>', faqTodas: 'Every question, <span class="gris">by area.</span>', faqSub: 'If your question is not here, write to',
    otras: 'The other areas', conectadas: 'Connected <span class="gris">to each other.</span>', areas: 'The areas of Bulx', cadaParte: 'Each part, <span class="gris">in detail.</span>',
    finalTit: 'A demo with your own gear.', finalTxt: 'Thirty minutes by video call, with your gear or vehicle spreadsheet. No commitment and nothing to install.',
    probar14: 'Try it free for 14 days', yaCliente: 'Already a customer · Log in', asuntoDemo: 'Bulx demo',
    dias: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], tu: 'You',
  },
  de: {
    inicio: 'Bulx, Startseite', secciones: 'Bereiche', menu: 'Menü', producto: 'Produkt', soluciones: 'Lösungen', bulx: 'Bulx', legal: 'Rechtliches',
    app: 'App', seguridad: 'Sicherheit', preguntas: 'Fragen', manuales: 'Handbücher (auf Spanisch)', sobre: 'Über Bulx', entrar: 'Anmelden', probar: 'Kostenlos testen',
    areasPortada: 'Die sechs Bereiche auf der Startseite →', comoFunciona: 'So funktioniert es', unDia: 'Ein Drehtag', privacidad: 'Datenschutz (auf Spanisch)',
    lema: 'Inventar und Produktion für Produktionsfirmen. Entwickelt auf Mallorca.', credito: '© 2026 bulx.es · Logo gestaltet von <b>Xavi Murillo</b>',
    estasEn: 'Sie sind hier', enCifras: 'In Zahlen', demo: 'Demo anfragen', verDia: 'Einen Drehtag ansehen', verManuales: 'Handbücher lesen (auf Spanisch)',
    queHace: 'Was es kann', enDetalle: (n) => `${n}, <span class="gris">im Detail.</span>`,
    comoEmpieza: 'So fangen Sie an', tresPasos: 'Drei Schritte <span class="gris">zum Start.</span>',
    faqTit: 'Häufige <span class="gris">Fragen.</span>', faqTodas: 'Alle Fragen, <span class="gris">nach Bereichen.</span>', faqSub: 'Ist Ihre Frage nicht dabei, schreiben Sie an',
    otras: 'Die anderen Bereiche', conectadas: 'Miteinander <span class="gris">verbunden.</span>', areas: 'Die Bereiche von Bulx', cadaParte: 'Jeder Teil, <span class="gris">im Detail.</span>',
    finalTit: 'Eine Demo mit Ihrem eigenen Equipment.', finalTxt: 'Dreißig Minuten per Videoanruf, mit Ihrer Equipment- oder Fahrzeugliste. Unverbindlich und ohne Installation.',
    probar14: '14 Tage kostenlos testen', yaCliente: 'Bereits Kunde · Anmelden', asuntoDemo: 'Bulx-Demo',
    dias: ['M', 'D', 'M', 'D', 'F', 'S', 'S'], tu: 'Sie',
  },
};

/* La plantilla de Excel que se descarga en cada idioma (la escribe plantilla-excel.js). */
const FICHEROS = { es: 'plantilla-inventario-material-rodaje.xlsx', en: 'equipment-inventory-template.xlsx', de: 'inventar-vorlage-filmequipment.xlsx' };

module.exports = { SLUGS, TXT, FICHEROS };
