/* Bulx · lanzadera en tres idiomas (18/10/2026, Xavi: «que cambie el idioma
   de español a inglés… incluso te diría de poner alemán»).

   El español va en el HTML, tal cual: es lo que se ve sin JavaScript y lo
   que leen los buscadores. Cada bloque de texto lleva data-t="tN"; aquí
   están el inglés y el alemán con la MISMA marca por dentro (las mismas
   clases, los mismos enlaces). Lo que no lleva traducción (cifras, horas,
   nombres de producto) se queda como está.

   Se elige con el selector de arriba; se recuerda en el navegador; la
   primera vez se mira el idioma del navegador; y ?lang=en / ?lang=de en la
   dirección manda sobre todo (para mandar el enlace ya en inglés). */
(function () {
  const T = {
    en: {
      _titulo: 'Bulx · Inventory and production for production companies',
      _desc: 'Bulx: the gear, the fleet, the quotes and the crew of a production company in one place. On the web and on the iPhone.',
      _secciones: 'Sections', _ventana: 'What Bulx looks like inside', _con: 'With Bulx',
      t1: `<details class="nav-desplegable"><summary>Product <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg></summary><div class="nav-menu"><div class="nav-menu-rejilla"><a href="/material/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/></svg><span><b>Gear</b><small>Gear and inventory</small></span></a><a href="/flota/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 15V7h11v8M14 10h4l3 4v1H3"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/></svg><span><b>Fleet</b><small>Bookings, MOT and reports</small></span></a><a href="/presupuestos/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg><span><b>Quotes</b><small>A link the client accepts</small></span></a><a href="/tecnologia/"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/></svg><span><b>IT</b><small>Devices, lines and licences</small></span></a><a href="/equipo/"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M19 14.6c1.6.8 2.6 2.6 3 5.4"/></svg><span><b>Crew and shoots</b><small>Hours, crew and chat</small></span></a><a href="/economia/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/></svg><span><b>Finance</b><small>Funnel, Excel and Power BI</small></span></a></div><a class="nav-menu-pie" href="#producto">See the six cells below →</a></div></details> <a href="#dia">A day</a> <a href="/app/">App</a> <a href="/seguridad/">Security</a> <a href="/preguntas/">FAQ</a>`,
      t2: `<a class="btn btn-texto" href="#entrar">Log in</a> <a class="btn btn-amarillo" href="#demo">Request a demo</a>`,
      t3: `<span class="hexito"></span>Inventory and production`,
      t4: `The whole shoot,<br>in a single <span class="subrayado">hive.</span>`,
      t5: `Bulx manages the gear inventory, the vehicle fleet, the rental quotes and the crew of an audiovisual production company. From the browser and from the iPhone.`,
      t6: `<a class="btn btn-amarillo btn-grande" href="#demo">Request a demo <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" href="#como">How it works</a>`,
      t7: `Developed at Palma Pictures, a production company in Mallorca, and in use there since August 2026.`,
      t8: `<span>Gear</span>`, t9: `<span>Fleet</span>`, t10: `<span>Shoot</span>`,
      t11: `<i></i><i></i><i></i><span>bulx.es · Fleet calendar</span>`,
      t12: `<b class="hx"></b>Home`, t13: `<b class="hx"></b>Projects`, t14: `<b class="hx"></b>Quotes`, t15: `Fleet`,
      t16: `<b class="hx"></b>Vehicles`, t17: `<b class="hx"></b>Calendar`, t18: `Gear`, t19: `<b class="hx"></b>Inventory`, t20: `<b class="hx"></b>QR labels`,
      t21: `Fleet`, t22: `Booking calendar`, t23: `<span class="on">Week</span><span>Month</span>`,
      t24: `<span></span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span class="finde">S</span><span class="finde">S</span>`,
      t25: `<span>V-01 · Furgoneta</span><i class="b amarillo" style="--d:1;--l:3">Meridiano commercial</i>`,
      t26: `<span>V-02 · Furgoneta</span><i class="b negro" style="--d:2;--l:4">Levante series</i>`,
      t27: `<span>W1 · Sprinter</span><i class="b amarillo" style="--d:0;--l:2">Wardrobe</i><i class="b gris" style="--d:4;--l:1">Garage</i>`,
      t28: `<span>GC3 · PickUp</span><i class="b negro" style="--d:3;--l:3">Location scout</i>`,
      t29: `<span>V-04 · Furgón</span><i class="b amarillo" style="--d:5;--l:2">Weekend shoot</i>`,
      t30: `<small>Vehicles free today</small><b>21<em>of 29</em></b>`,
      t31: `<small>Gear at base</small><b>92<em>%</em></b>`,
      t32: `<small>Quotes pending</small><b>6</b>`,
      t33: `<span class="hexito"></span>Figures from the production company where Bulx was developed`,
      t34: `<b data-cuenta="711">711</b><span>items with a record and a QR label</span>`,
      t35: `<b data-cuenta="29">29</b><span>vehicles in the booking calendar</span>`,
      t36: `<b data-cuenta="180">180</b><span>people, staff and crew</span>`,
      t37: `<b data-cuenta="51">51</b><span>shooting days in 2026, to October</span>`,
      t38: `<span class="hexito"></span>The product`,
      t39: `Six areas, <span class="gris">connected to each other.</span>`,
      t40: `Each area works on its own and shares its data with the others: an accepted quote reserves the gear, a booking blocks a vehicle in the calendar and each person sees the project they are assigned to.`,
      t41: `Gear and inventory`,
      t42: `Gear records with serial number, photo and QR label. Kits with their contents, dimensions and weight per case, and the status of each item: in the warehouse, on a project or in repair.`,
      t43: `<b class="hx amarillo"></b><span>ARRI Alexa Mini<small>Camera · 1 unit</small></span><em class="ok">At base</em>`,
      t44: `<b class="hx negro"></b><span>SkyPanel S60 kit<small>Lights · 4 units</small></span><em class="uso">In use</em>`,
      t45: `<b class="hx gris"></b><span>Dolly Fisher 10<small>Grip · 1 unit</small></span><em class="mal">Repair</em>`,
      t46: `Fleet`,
      t47: `Booking calendar by project, MOT and insurance reminders, breakdown reports from the phone and check-out and return records with the vehicle label.`,
      t48: `<span>Inspection · V-03</span><i style="--p:.82"></i><small>expires in 12 days</small>`,
      t49: `Quotes`,
      t50: `Built from the catalogue and sent as a link. The client accepts or requests changes online; if there is no reply, a scheduled reminder goes out.`,
      t51: `<span class="h">Sent</span><span class="a">Review</span><span>Accepted</span>`,
      t52: `Technology`,
      t53: `Laptops, phones, lines, MiFi routers and licences assigned to each person. When someone leaves, Bulx produces the list of what has to be returned.`,
      t54: `Crew and shoots`,
      t55: `Who works on each project and for how many hours, logged from the phone or the Apple Watch. Internal chat with references to quotes, vehicles and gear.`,
      t56: `Finance, Excel and Power BI`,
      t57: `Quoted, accepted and invoiced amounts by project, client and month. An Excel report with charts and a live connection for Power BI.`,
      t58: `<span class="hexito"></span>How it works`,
      t59: `Three steps <span class="gris">to get started.</span>`,
      t61: `Import the current data`,
      t62: `The gear spreadsheet, the vehicle list and the people list. Bulx organises them by department and assigns a code to each item.`,
      t64: `Print and attach the labels`,
      t65: `One label per case, item or vehicle, printed from Bulx. Scanning it with a phone records who takes it, when and for which project. Nothing to install.`,
      t67: `Quote and reserve`,
      t68: `Quotes are built from the catalogue. When the client accepts, the gear and the vehicles are reserved for those dates and cannot be assigned to another project.`,
      t69: `<span class="hexito"></span>A shooting day`,
      t70: `A shooting day, <span class="gris">step by step.</span>`,
      t72: `Vehicle check-out`,
      t73: `Marta scans the label on V-02. It records who is taking it, at what mileage and for which project.`,
      t75: `Gear check-out`,
      t76: `The lighting kit cases leave the warehouse. They are the ones listed in the accepted quote, and the total weight for transport is already calculated.`,
      t78: `A breakdown`,
      t79: `A blown tail light. The report is sent from the phone with a photo and creates a workshop order before the vehicle is back.`,
      t81: `A quote is accepted`,
      t82: `The client opens the quote link for the next project and accepts it. The gear is reserved for those dates.`,
      t84: `Return`,
      t85: `The gear is scanned on return. If anything is missing or damaged, it is flagged in the return and on the item record.`,
      t86: `<span class="hexito"></span>The change`,
      t87: `What changes <span class="gris">day to day.</span>`,
      t88: `Before`,
      t89: `A gear spreadsheet updated by hand`,
      t90: `Vehicle bookings arranged by messages`,
      t91: `MOT and insurance dates noted elsewhere`,
      t92: `No one knows for sure who has which piece of equipment`,
      t93: `The quote, as a PDF attached to an email`,
      t94: `One record per item, with photo and QR label`,
      t95: `A booking calendar the whole team can see`,
      t96: `Reminders before each expiry date`,
      t97: `Who has what, since when and for which project`,
      t98: `A link the client accepts online, with the date recorded`,
      t99: `<span class="hexito negro"></span>On iPhone and iPad`,
      t100: `The app for iPhone<br>and iPad.`,
      t101: `Scan labels, book a vehicle, log hours or check availability from the warehouse or the set. With Face ID and notifications.`,
      t102: `QR label scanner for gear and vehicles`,
      t103: `Vehicle bookings by day and by type`,
      t104: `Internal chat with quote and gear cards`,
      t105: `<b class="hx negro"></b><span>V-02 booked<small>14 – 16 Oct · Shoot in Sóller</small></span>`,
      t106: `<b class="hx amarillo"></b><span>Scanned<small>ARRI Alexa Mini · out to a shoot</small></span>`,
      t107: `<b class="hx amarillo"></b><span>Quote accepted<small>PRESUP-2026-106 · 2 min ago</small></span>`,
      t108: `<small>Good morning</small><b>una productora</b>`,
      t109: `<small>Sunday 18</small><b>51</b><span>shooting days this year</span>`,
      t110: `<b>29</b><span>vehicles free</span>`,
      t111: `<b>787</b><span>in the warehouse</span>`,
      t112: `<span class="hx amarillo"></span>Scan`,
      t113: `<b class="hx amarillo"></b><span>V-02 · Furgoneta<small>With you until Thursday</small></span>`,
      t114: `<b class="hx negro"></b><span>SkyPanel S60 kit<small>4 cases · 38 kg</small></span>`,
      t115: `<b class="hx gris"></b><span>Your hours today<small>9 h · Shoot in Sóller</small></span>`,
      t116: `<span class="hexito"></span>Security`,
      t117: `Access, permissions <span class="gris">and audit log.</span>`,
      t118: `Production data belongs to the production company. Bulx documents who accesses it, what they see and what they change.`,
      t119: `<b>Sign in with Microsoft</b><span>The team signs in with its Microsoft 365 work account, with the company's two-step verification.</span>`,
      t120: `<b>Two-step verification</b><span>For password sign-in: a six-digit code from an authenticator app, no SMS.</span>`,
      t121: `<b>Permissions by area</b><span>Production, fleet, gear, IT and finance, with read, edit or full levels.</span>`,
      t122: `<b>Activity log</b><span>Every change is recorded with the person, the action and the date. The log cannot be deleted.</span>`,
      t123: `<b>Servers in Europe</b><span>Data is stored in Frankfurt, with backups.</span>`,
      t124: `<b>Expiring links</b><span>Anything shared externally, such as a quote or a calendar, expires and can be revoked.</span>`,
      t125: `<span class="hexito"></span>Integrations`,
      t126: `Works with <span class="gris">the usual tools.</span>`,
      t128: `Sign in with the work account`,
      t130: `Import and export, with reports`,
      t132: `Live data connection`,
      t133: `iPhone and iPad`,
      t134: `With Face ID and notifications`,
      t135: `Email`,
      t136: `Quotes and reminders by email`,
      t137: `QR labels`,
      t138: `Printed from Bulx on any printer`,
      t139: `<span class="hexito"></span>FAQ`,
      t140: `Frequently asked <span class="gris">questions.</span>`,
      t141: `If your question is not here, write to <a href="mailto:info@stokit.es">info@stokit.es</a>.`,
      t142: `Do I need to install anything?`,
      t143: `No. Bulx is a web application used from the browser. The iPhone and iPad app is optional, meant for scanning, booking and clocking in.`,
      t144: `Can the current inventory be imported?`,
      t145: `Yes. It is imported from an Excel sheet; Bulx organises it by department and assigns a code to each item. Anything that does not fit is flagged for review.`,
      t146: `Who sees what?`,
      t147: `Each person sees the areas they have permission for: production, fleet, gear or IT. Prices and finance are only visible with Finance permission.`,
      t148: `Where is the data stored?`,
      t149: `On servers in Frankfurt (Germany), with backups. Every change is recorded with the person, the action and the date.`,
      t150: `What size of production company is it meant for?`,
      t151: `It was developed at a production company with over 700 items, 29 vehicles and 180 people between staff and crew. There is no minimum volume.`,
      t152: `How much does it cost?`,
      t153: `It depends on the volume of gear and the number of people. It is set out in writing at the demo.`,
      t154: `A demo with your own gear.`,
      t155: `Thirty minutes by video call, with your gear or vehicle spreadsheet. No commitment and nothing to install.`,
      t156: `<a class="btn btn-amarillo btn-grande" href="mailto:info@stokit.es?subject=I%20want%20to%20see%20Bulx">Request a demo <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" id="entrar" href="#entrar">Already a client · Log in</a>`,
      t157: `Inventory and production for production companies.`,
      t158: `<b>Product</b><a href="/material/">Gear</a><a href="/flota/">Fleet</a><a href="/presupuestos/">Quotes</a><a href="/tecnologia/">IT</a><a href="/equipo/">Crew and shoots</a><a href="/economia/">Finance</a><a href="/app/">App</a>`,
      t159: `<b>Bulx</b><a href="#como">How it works</a><a href="#dia">A shooting day</a><a href="/seguridad/">Security</a><a href="/preguntas/">FAQ</a><a href="/sobre/">About Bulx</a><a href="/demo/">Request a demo</a><a href="manuales/">Manuals (Spanish)</a><a href="privacidad.html">Privacy</a>`,
      t160: `© 2026 bulx.es · Logo designed by <b>Xavi Murillo</b>`,
      t161: `More about this <span aria-hidden="true">→</span>`,
      t162: `More about this <span aria-hidden="true">→</span>`,
      t163: `More about this <span aria-hidden="true">→</span>`,
      t164: `More about this <span aria-hidden="true">→</span>`,
      t165: `More about this <span aria-hidden="true">→</span>`,
      t166: `More about this <span aria-hidden="true">→</span>`,
    },

    de: {
      _titulo: 'Bulx · Inventar und Produktion für Produktionsfirmen',
      _desc: 'Bulx: Equipment, Fuhrpark, Angebote und Team einer Produktionsfirma an einem Ort. Im Web und auf dem iPhone.',
      _secciones: 'Bereiche', _ventana: 'So sieht Bulx von innen aus', _con: 'Mit Bulx',
      t1: `<details class="nav-desplegable"><summary>Produkt <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6.5l4 4 4-4"/></svg></summary><div class="nav-menu"><div class="nav-menu-rejilla"><a href="/material/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/></svg><span><b>Equipment</b><small>Equipment und Inventar</small></span></a><a href="/flota/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 15V7h11v8M14 10h4l3 4v1H3"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/></svg><span><b>Fuhrpark</b><small>Buchungen, TÜV und Meldungen</small></span></a><a href="/presupuestos/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg><span><b>Angebote</b><small>Ein Link, den der Kunde annimmt</small></span></a><a href="/tecnologia/"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/></svg><span><b>IT</b><small>Geräte, Leitungen und Lizenzen</small></span></a><a href="/equipo/"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M19 14.6c1.6.8 2.6 2.6 3 5.4"/></svg><span><b>Team und Drehs</b><small>Stunden, Crew und Chat</small></span></a><a href="/economia/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/></svg><span><b>Finanzen</b><small>Funnel, Excel und Power BI</small></span></a></div><a class="nav-menu-pie" href="#producto">Die sechs Zellen hier unten →</a></div></details> <a href="#dia">Ein Tag</a> <a href="/app/">App</a> <a href="/seguridad/">Sicherheit</a> <a href="/preguntas/">Fragen</a>`,
      t2: `<a class="btn btn-texto" href="#entrar">Anmelden</a> <a class="btn btn-amarillo" href="#demo">Demo anfragen</a>`,
      t3: `<span class="hexito"></span>Inventar und Produktion`,
      t4: `Der ganze Dreh,<br>in einer einzigen <span class="subrayado">Wabe.</span>`,
      t5: `Bulx verwaltet das Equipment-Inventar, den Fuhrpark, die Mietangebote und das Team einer audiovisuellen Produktionsfirma. Im Browser und auf dem iPhone.`,
      t6: `<a class="btn btn-amarillo btn-grande" href="#demo">Demo anfragen <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" href="#como">So funktioniert es</a>`,
      t7: `Entwickelt bei Palma Pictures, einer Produktionsfirma auf Mallorca, und dort seit August 2026 im Einsatz.`,
      t8: `<span>Equipment</span>`, t9: `<span>Fuhrpark</span>`, t10: `<span>Dreh</span>`,
      t11: `<i></i><i></i><i></i><span>bulx.es · Fuhrpark-Kalender</span>`,
      t12: `<b class="hx"></b>Start`, t13: `<b class="hx"></b>Projekte`, t14: `<b class="hx"></b>Angebote`, t15: `Fuhrpark`,
      t16: `<b class="hx"></b>Fahrzeuge`, t17: `<b class="hx"></b>Kalender`, t18: `Equipment`, t19: `<b class="hx"></b>Inventar`, t20: `<b class="hx"></b>QR-Etiketten`,
      t21: `Fuhrpark`, t22: `Buchungskalender`, t23: `<span class="on">Woche</span><span>Monat</span>`,
      t24: `<span></span><span>M</span><span>D</span><span>M</span><span>D</span><span>F</span><span class="finde">S</span><span class="finde">S</span>`,
      t25: `<span>V-01 · Furgoneta</span><i class="b amarillo" style="--d:1;--l:3">Meridiano-Werbespot</i>`,
      t26: `<span>V-02 · Furgoneta</span><i class="b negro" style="--d:2;--l:4">Levante-Serie</i>`,
      t27: `<span>W1 · Sprinter</span><i class="b amarillo" style="--d:0;--l:2">Kostüm</i><i class="b gris" style="--d:4;--l:1">Werkstatt</i>`,
      t28: `<span>GC3 · PickUp</span><i class="b negro" style="--d:3;--l:3">Motivsuche</i>`,
      t29: `<span>V-04 · Furgón</span><i class="b amarillo" style="--d:5;--l:2">Wochenenddreh</i>`,
      t30: `<small>Heute freie Fahrzeuge</small><b>21<em>von 29</em></b>`,
      t31: `<small>Equipment im Lager</small><b>92<em>%</em></b>`,
      t32: `<small>Offene Angebote</small><b>6</b>`,
      t33: `<span class="hexito"></span>Zahlen der Produktionsfirma, in der Bulx entwickelt wurde`,
      t34: `<b data-cuenta="711">711</b><span>Artikel mit Datenblatt und QR-Etikett</span>`,
      t35: `<b data-cuenta="29">29</b><span>Fahrzeuge im Reservierungskalender</span>`,
      t36: `<b data-cuenta="180">180</b><span>Personen, Belegschaft und Crew</span>`,
      t37: `<b data-cuenta="51">51</b><span>Drehtage 2026, bis Oktober</span>`,
      t38: `<span class="hexito"></span>Das Produkt`,
      t39: `Sechs Bereiche, <span class="gris">miteinander verbunden.</span>`,
      t40: `Jeder Bereich arbeitet für sich und teilt seine Daten mit den anderen: ein angenommenes Angebot reserviert das Equipment, eine Reservierung belegt ein Fahrzeug im Kalender, und jede Person sieht das ihr zugewiesene Projekt.`,
      t41: `Equipment und Inventar`,
      t42: `Equipment-Datenblätter mit Seriennummer, Foto und QR-Etikett. Kits mit Inhalt, Maße und Gewicht pro Kiste und der Status jedes Artikels: im Lager, im Projekt oder in Reparatur.`,
      t43: `<b class="hx amarillo"></b><span>ARRI Alexa Mini<small>Kamera · 1 Stk.</small></span><em class="ok">Im Lager</em>`,
      t44: `<b class="hx negro"></b><span>SkyPanel-S60-Kit<small>Licht · 4 Stk.</small></span><em class="uso">Im Einsatz</em>`,
      t45: `<b class="hx gris"></b><span>Dolly Fisher 10<small>Grip · 1 Stk.</small></span><em class="mal">Werkstatt</em>`,
      t46: `Fuhrpark`,
      t47: `Reservierungskalender nach Projekt, Erinnerungen an TÜV und Versicherung, Schadensmeldungen vom Handy und Ausgabe- und Rückgabeprotokolle über das Fahrzeugetikett.`,
      t48: `<span>TÜV · V-03</span><i style="--p:.82"></i><small>läuft in 12 Tagen ab</small>`,
      t49: `Angebote`,
      t50: `Aus dem Katalog zusammengestellt und als Link verschickt. Der Kunde nimmt online an oder bittet um Änderungen; bleibt eine Antwort aus, geht eine geplante Erinnerung heraus.`,
      t51: `<span class="h">Gesendet</span><span class="a">Prüfung</span><span>Angenommen</span>`,
      t52: `Technik`,
      t53: `Laptops, Handys, Leitungen, MiFi-Router und Lizenzen, jeder Person zugeordnet. Beim Austritt erstellt Bulx die Liste dessen, was zurückzugeben ist.`,
      t54: `Team und Drehs`,
      t55: `Wer an welchem Projekt arbeitet und wie viele Stunden, erfasst vom Handy oder der Apple Watch. Interner Chat mit Verweisen auf Angebote, Fahrzeuge und Equipment.`,
      t56: `Finanzen, Excel und Power BI`,
      t57: `Angebotene, angenommene und verbuchte Beträge nach Projekt, Kunde und Monat. Excel-Bericht mit Diagrammen und Live-Anbindung für Power BI.`,
      t58: `<span class="hexito"></span>So funktioniert's`,
      t59: `Drei Schritte <span class="gris">zum Start.</span>`,
      t61: `Vorhandene Daten importieren`,
      t62: `Die Equipment-Tabelle, die Fahrzeugliste und die Personenliste. Bulx ordnet sie nach Abteilungen und vergibt für jeden Artikel einen Code.`,
      t64: `Etiketten drucken und anbringen`,
      t65: `Ein Etikett pro Kiste, Artikel oder Fahrzeug, gedruckt aus Bulx. Beim Scannen mit dem Handy wird erfasst, wer es mitnimmt, wann und für welches Projekt. Keine Installation nötig.`,
      t67: `Anbieten und reservieren`,
      t68: `Angebote werden aus dem Katalog zusammengestellt. Nimmt der Kunde an, sind Equipment und Fahrzeuge für diese Termine reserviert und können keinem anderen Projekt zugewiesen werden.`,
      t69: `<span class="hexito"></span>Ein Drehtag`,
      t70: `Ein Drehtag, <span class="gris">Schritt für Schritt.</span>`,
      t72: `Fahrzeugausgabe`,
      t73: `Marta scannt das Etikett des V-02. Erfasst wird, wer ihn fährt, mit welchem Kilometerstand und für welches Projekt.`,
      t75: `Equipment-Ausgabe`,
      t76: `Die Kisten des Lichtkits verlassen das Lager. Es sind die im angenommenen Angebot aufgeführten, und das Gesamtgewicht für den Transport ist bereits berechnet.`,
      t78: `Ein Schaden`,
      t79: `Ein defektes Rücklicht. Die Meldung geht mit Foto vom Handy raus und erzeugt einen Werkstattauftrag, bevor das Fahrzeug zurück ist.`,
      t81: `Ein Angebot wird angenommen`,
      t82: `Der Kunde öffnet den Angebotslink für das nächste Projekt und nimmt an. Das Equipment ist für diese Termine reserviert.`,
      t84: `Rückgabe`,
      t85: `Das Equipment wird bei der Rückgabe gescannt. Fehlt etwas oder ist es beschädigt, wird das in der Rückgabe und im Artikel-Datenblatt vermerkt.`,
      t86: `<span class="hexito"></span>Der Unterschied`,
      t87: `Was sich <span class="gris">im Alltag ändert.</span>`,
      t88: `Vorher`,
      t89: `Eine von Hand gepflegte Equipment-Tabelle`,
      t90: `Fahrzeugreservierungen per Nachricht`,
      t91: `TÜV- und Versicherungstermine separat notiert`,
      t92: `Niemand weiß sicher, wer welches Gerät hat`,
      t93: `Das Angebot als PDF im E-Mail-Anhang`,
      t94: `Ein Datenblatt pro Artikel, mit Foto und QR-Etikett`,
      t95: `Ein Reservierungskalender, den das ganze Team sieht`,
      t96: `Erinnerungen vor jedem Ablaufdatum`,
      t97: `Wer was hat, seit wann und für welches Projekt`,
      t98: `Ein Link, den der Kunde online annimmt, mit erfasstem Datum`,
      t99: `<span class="hexito negro"></span>Auf iPhone und iPad`,
      t100: `Die App für iPhone<br>und iPad.`,
      t101: `Etiketten scannen, ein Fahrzeug reservieren, Stunden erfassen oder die Verfügbarkeit prüfen, vom Lager oder vom Set aus. Mit Face ID und Mitteilungen.`,
      t102: `QR-Scanner für Equipment und Fahrzeuge`,
      t103: `Fahrzeugreservierungen nach Tagen und Typ`,
      t104: `Interner Chat mit Angebots- und Equipment-Karten`,
      t105: `<b class="hx negro"></b><span>V-02 gebucht<small>14.–16. Okt. · Dreh in Sóller</small></span>`,
      t106: `<b class="hx amarillo"></b><span>Gescannt<small>ARRI Alexa Mini · geht zum Dreh</small></span>`,
      t107: `<b class="hx amarillo"></b><span>Angebot angenommen<small>PRESUP-2026-106 · vor 2 Min.</small></span>`,
      t108: `<small>Guten Morgen</small><b>una productora</b>`,
      t109: `<small>Sonntag, 18.</small><b>51</b><span>Drehtage in diesem Jahr</span>`,
      t110: `<b>29</b><span>Fahrzeuge frei</span>`,
      t111: `<b>787</b><span>im Lager</span>`,
      t112: `<span class="hx amarillo"></span>Scannen`,
      t113: `<b class="hx amarillo"></b><span>V-02 · Furgoneta<small>Bei dir bis Donnerstag</small></span>`,
      t114: `<b class="hx negro"></b><span>SkyPanel-S60-Kit<small>4 Kisten · 38 kg</small></span>`,
      t115: `<b class="hx gris"></b><span>Deine Stunden heute<small>9 Std. · Dreh in Sóller</small></span>`,
      t116: `<span class="hexito"></span>Sicherheit`,
      t117: `Zugang, Berechtigungen <span class="gris">und Protokoll.</span>`,
      t118: `Produktionsdaten gehören der Produktionsfirma. Bulx dokumentiert, wer zugreift, was er sieht und was er ändert.`,
      t119: `<b>Anmeldung mit Microsoft</b><span>Das Team meldet sich mit dem Microsoft-365-Firmenkonto an, mit der Zwei-Faktor-Prüfung des Unternehmens.</span>`,
      t120: `<b>Zwei-Faktor-Prüfung</b><span>Für die Anmeldung mit Passwort: ein sechsstelliger Code aus einer Authenticator-App, ohne SMS.</span>`,
      t121: `<b>Berechtigungen nach Bereich</b><span>Produktion, Fuhrpark, Equipment, IT und Finanzen, mit den Stufen Lesen, Bearbeiten oder Voll.</span>`,
      t122: `<b>Aktivitätsprotokoll</b><span>Jede Änderung wird mit Person, Aktion und Datum erfasst. Das Protokoll lässt sich nicht löschen.</span>`,
      t123: `<b>Server in Europa</b><span>Die Daten liegen in Frankfurt, mit Sicherungskopien.</span>`,
      t124: `<b>Links mit Ablaufdatum</b><span>Was nach außen geteilt wird, etwa ein Angebot oder ein Kalender, läuft ab und lässt sich widerrufen.</span>`,
      t125: `<span class="hexito"></span>Integrationen`,
      t126: `Funktioniert mit <span class="gris">den üblichen Werkzeugen.</span>`,
      t128: `Anmeldung mit dem Firmenkonto`,
      t130: `Import und Export, mit Berichten`,
      t132: `Live-Datenanbindung`,
      t133: `iPhone und iPad`,
      t134: `Mit Face ID und Mitteilungen`,
      t135: `E-Mail`,
      t136: `Angebote und Erinnerungen per E-Mail`,
      t137: `QR-Etiketten`,
      t138: `Aus Bulx auf jedem Drucker gedruckt`,
      t139: `<span class="hexito"></span>Fragen`,
      t140: `Häufige <span class="gris">Fragen.</span>`,
      t141: `Ist Ihre Frage nicht dabei, schreiben Sie an <a href="mailto:info@stokit.es">info@stokit.es</a>.`,
      t142: `Muss ich etwas installieren?`,
      t143: `Nein. Bulx ist eine Webanwendung für den Browser. Die iPhone- und iPad-App ist optional, gedacht zum Scannen, Reservieren und Zeiterfassen.`,
      t144: `Lässt sich das bestehende Inventar importieren?`,
      t145: `Ja. Es wird aus einer Excel-Tabelle importiert; Bulx ordnet es nach Abteilungen und vergibt für jeden Artikel einen Code. Was nicht passt, wird zur Prüfung markiert.`,
      t146: `Wer sieht was?`,
      t147: `Jede Person sieht die Bereiche, für die sie berechtigt ist: Produktion, Fuhrpark, Equipment oder IT. Preise und Finanzen sind nur mit Finanz-Berechtigung sichtbar.`,
      t148: `Wo werden die Daten gespeichert?`,
      t149: `Auf Servern in Frankfurt (Deutschland), mit Sicherungskopien. Jede Änderung wird mit Person, Aktion und Datum erfasst.`,
      t150: `Für welche Firmengröße ist es gedacht?`,
      t151: `Es wurde in einer Produktionsfirma mit über 700 Artikeln, 29 Fahrzeugen und 180 Personen aus Belegschaft und Crew entwickelt. Es gibt kein Mindestvolumen.`,
      t152: `Was kostet es?`,
      t153: `Das hängt vom Equipment-Umfang und der Personenzahl ab. Es wird bei der Demo schriftlich festgelegt.`,
      t154: `Eine Demo mit Ihrem eigenen Equipment.`,
      t155: `Dreißig Minuten per Videoanruf, mit Ihrer Equipment- oder Fahrzeugliste. Unverbindlich und ohne Installation.`,
      t156: `<a class="btn btn-amarillo btn-grande" href="mailto:info@stokit.es?subject=Ich%20m%C3%B6chte%20Bulx%20sehen">Demo anfragen <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" id="entrar" href="#entrar">Schon Kunde · Anmelden</a>`,
      t157: `Inventar und Produktion für Produktionsfirmen.`,
      t158: `<b>Produkt</b><a href="/material/">Equipment</a><a href="/flota/">Fuhrpark</a><a href="/presupuestos/">Angebote</a><a href="/tecnologia/">IT</a><a href="/equipo/">Team und Drehs</a><a href="/economia/">Finanzen</a><a href="/app/">App</a>`,
      t159: `<b>Bulx</b><a href="#como">So funktioniert's</a><a href="#dia">Ein Drehtag</a><a href="/seguridad/">Sicherheit</a><a href="/preguntas/">Fragen</a><a href="/sobre/">Über Bulx</a><a href="/demo/">Demo anfragen</a><a href="manuales/">Handbücher (Spanisch)</a><a href="privacidad.html">Datenschutz</a>`,
      t160: `© 2026 bulx.es · Logo gestaltet von <b>Xavi Murillo</b>`,
      t161: `Mehr dazu <span aria-hidden="true">→</span>`,
      t162: `Mehr dazu <span aria-hidden="true">→</span>`,
      t163: `Mehr dazu <span aria-hidden="true">→</span>`,
      t164: `Mehr dazu <span aria-hidden="true">→</span>`,
      t165: `Mehr dazu <span aria-hidden="true">→</span>`,
      t166: `Mehr dazu <span aria-hidden="true">→</span>`,
    },
  };

  const IDIOMAS = ['es', 'en', 'de'];
  /* Las banderas, a trazo: España sin escudo (como en la bandera civil),
     la Union Jack con sus dos aspas y Alemania a tres franjas. El
     `slice` hace que llenen el círculo que las recorta. */
  const BANDERA = {
    es: '<svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice"><rect width="3" height="2" fill="#AA151B"/><rect y=".5" width="3" height="1" fill="#F1BF00"/></svg>',
    en: '<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="bx-uk"><path d="M30 15h30v15zv15H30zH0V15zV0h30z"/></clipPath><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#bx-uk)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>',
    de: '<svg viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice"><rect width="5" height="3" fill="#000"/><rect y="1" width="5" height="2" fill="#D00"/><rect y="2" width="5" height="1" fill="#FFCE00"/></svg>',
  };
  const NOMBRE = { es: 'Español', en: 'English', de: 'Deutsch' };

  /* El español, leído del propio HTML la primera vez: así no hay que
     mantener una tercera copia. */
  const ES = {};
  document.querySelectorAll('[data-t]').forEach(el => { ES[el.dataset.t] = el.innerHTML; });
  const meta = document.querySelector('meta[name="description"]');
  const nav = document.querySelector('.nav-enlaces');
  const ventana = document.getElementById('ventana');
  const conImg = document.querySelector('.antes-t.con .antes-tit img');
  ES._titulo = document.title; ES._desc = meta ? meta.content : '';
  ES._secciones = nav ? nav.getAttribute('aria-label') : ''; ES._ventana = ventana ? ventana.getAttribute('aria-label') : '';
  ES._con = conImg ? conImg.alt : '';

  function poner(lang, guardar) {
    if (!IDIOMAS.includes(lang)) lang = 'es';
    const d = lang === 'es' ? ES : T[lang];
    document.querySelectorAll('[data-t]').forEach(el => {
      const html = d[el.dataset.t] !== undefined ? d[el.dataset.t] : ES[el.dataset.t];
      if (el.innerHTML !== html) el.innerHTML = html;
    });
    document.documentElement.lang = lang;
    document.title = d._titulo || ES._titulo;
    if (meta) meta.content = d._desc || ES._desc;
    if (nav) nav.setAttribute('aria-label', d._secciones || ES._secciones);
    if (ventana) ventana.setAttribute('aria-label', d._ventana || ES._ventana);
    if (conImg) conImg.alt = d._con || ES._con;
    document.querySelectorAll('.idioma button').forEach(b => {
      const si = b.dataset.lang === lang;
      b.setAttribute('aria-pressed', si ? 'true' : 'false');
    });
    const sel = document.querySelector('.idioma'); if (sel) sel.dataset.lang = lang;
    if (guardar) {
      try { localStorage.setItem('bulxIdioma', lang); } catch (e) {}
      /* La dirección dice el idioma, para que un enlace copiado se abra igual. */
      try {
        const u = new URL(location.href);
        if (lang === 'es') u.searchParams.delete('lang'); else u.searchParams.set('lang', lang);
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      } catch (e) {}
    }
    /* Las preguntas se envuelven al cargar (vida.js); al cambiar el texto
       dentro del <p> se conserva el envoltorio, así que no hay que rehacerlo. */
    document.dispatchEvent(new CustomEvent('bulx:idioma', { detail: lang }));
  }

  /* El selector: tres botones en una píldora, con la marca deslizándose. */
  function montarSelector() {
    const acc = document.querySelector('.nav-acciones');
    if (!acc || document.querySelector('.idioma')) return;
    const caja = document.createElement('div');
    caja.className = 'idioma'; caja.setAttribute('role', 'group'); caja.setAttribute('aria-label', 'Idioma · Language · Sprache');
    /* Cada idioma con su bandera (18/10/2026, Xavi: «¿podríamos poner
       banderas del Reino Unido, Alemania y España?»). Van dibujadas aquí
       mismo, sin imágenes: un círculo recortado sobre la bandera. Las
       siglas se quedan, que la bandera sola no la lee un lector de
       pantalla; en el móvil se esconden y se queda la bandera. */
    caja.innerHTML = '<i class="idioma-marca" aria-hidden="true"></i>' + IDIOMAS.map(l =>
      `<button type="button" data-lang="${l}" lang="${l}" title="${NOMBRE[l]}" aria-pressed="false"><span class="idioma-bandera" aria-hidden="true">${BANDERA[l]}</span><span class="idioma-sigla">${l.toUpperCase()}</span></button>`).join('');
    caja.addEventListener('click', (ev) => { const b = ev.target.closest('button[data-lang]'); if (b) poner(b.dataset.lang, true); });
    acc.parentNode.insertBefore(caja, acc);
  }

  function inicial() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && IDIOMAS.includes(q)) return q;
    try { const g = localStorage.getItem('bulxIdioma'); if (g && IDIOMAS.includes(g)) return g; } catch (e) {}
    const nav2 = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    const corto = nav2.slice(0, 2).toLowerCase();
    /* Las lenguas de España, en español; el alemán, en alemán; el resto del
       mundo, en inglés. */
    if (['es', 'ca', 'gl', 'eu'].includes(corto)) return 'es';
    return corto === 'de' ? 'de' : 'en';
  }

  montarSelector();
  poner(inicial(), false);
  window.bulxIdioma = (l) => poner(l, true);
})();
