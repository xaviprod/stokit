/* bulx · lanzadera en tres idiomas (18/10/2026, Xavi: «que cambie el idioma
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
      _titulo: 'bulx · Inventory and production for production companies',
      _desc: 'bulx: the gear, the fleet, the quotes and the crew of a production company in one place. On the web and on the iPhone.',
      _secciones: 'Sections', _ventana: 'What bulx looks like inside', _con: 'With bulx',
      t1: `<a href="#producto">Product</a> <a href="#dia">A day</a> <a href="#app">App</a> <a href="#seguridad">Security</a> <a href="#preguntas">FAQ</a>`,
      t2: `<a class="btn btn-texto" href="#entrar">Log in</a> <a class="btn btn-amarillo" href="#demo">Book a demo</a>`,
      t3: `<span class="hexito"></span>Inventory and production`,
      t4: `The whole shoot,<br>in a single <span class="subrayado">hive.</span>`,
      t5: `Your production company's gear, fleet, quotes and crew, each in its own cell and all connected. On the web and on the iPhone.`,
      t6: `<a class="btn btn-amarillo btn-grande" href="#demo">Book a demo <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" href="#como">See how it works</a>`,
      t7: `Built inside a production company in Mallorca, for the day-to-day of a shoot.`,
      t8: `<span>Gear</span>`, t9: `<span>Fleet</span>`, t10: `<span>Shoot</span>`,
      t11: `<i></i><i></i><i></i><span>bulx.es · Fleet calendar</span>`,
      t12: `<b class="hx"></b>Home`, t13: `<b class="hx"></b>Projects`, t14: `<b class="hx"></b>Quotes`, t15: `Fleet`,
      t16: `<b class="hx"></b>Vehicles`, t17: `<b class="hx"></b>Calendar`, t18: `Gear`, t19: `<b class="hx"></b>Inventory`, t20: `<b class="hx"></b>QR labels`,
      t21: `Fleet`, t22: `Booking calendar`, t23: `<span class="on">Week</span><span>Month</span>`,
      t24: `<span></span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span class="finde">S</span><span class="finde">S</span>`,
      t25: `<span>MV1 · Vito</span><i class="b amarillo" style="--d:1;--l:3">Netflix commercial</i>`,
      t26: `<span>MV2 · Vito</span><i class="b negro" style="--d:2;--l:4">HBO series</i>`,
      t27: `<span>W1 · Sprinter</span><i class="b amarillo" style="--d:0;--l:2">Wardrobe</i><i class="b gris" style="--d:4;--l:1">Garage</i>`,
      t28: `<span>GC3 · PickUp</span><i class="b negro" style="--d:3;--l:3">Location scout</i>`,
      t29: `<span>UV1 · Vito</span><i class="b amarillo" style="--d:5;--l:2">Weekend shoot</i>`,
      t30: `<small>Vehicles free today</small><b>21<em>of 29</em></b>`,
      t31: `<small>Gear at base</small><b>92<em>%</em></b>`,
      t32: `<small>Quotes pending</small><b>6</b>`,
      t33: `<span class="hexito"></span>Today at Palma Pictures, the production company where bulx was born`,
      t34: `<b data-cuenta="711">711</b><span>items with their own record and QR</span>`,
      t35: `<b data-cuenta="29">29</b><span>vehicles in a single calendar</span>`,
      t36: `<b data-cuenta="180">180</b><span>people on staff and crew</span>`,
      t37: `<b data-cuenta="51">51</b><span>shooting days so far in 2026</span>`,
      t38: `<span class="hexito"></span>The product`,
      t39: `Six cells. <span class="gris">One hive.</span>`,
      t40: `Every area has its place, but they talk to each other: the quote knows what gear is going out, the calendar knows which van is in the garage and the crew knows which shoot is theirs.`,
      t41: `Gear and inventory`,
      t42: `Every case, light or camera with its record, photo and QR code. Kits with what's inside, sizes and weights for the truck, and what's out, at base or in repair at a glance.`,
      t43: `<b class="hx amarillo"></b><span>ARRI Alexa Mini<small>Camera · 1 unit</small></span><em class="ok">At base</em>`,
      t44: `<b class="hx negro"></b><span>SkyPanel S60 kit<small>Lights · 4 units</small></span><em class="uso">In use</em>`,
      t45: `<b class="hx gris"></b><span>Dolly Fisher 10<small>Grip · 1 unit</small></span><em class="mal">Repair</em>`,
      t46: `Fleet`,
      t47: `Bookings on a timeline, inspection and insurance reminders, damage reports from the QR on the door and a map of where every vehicle is.`,
      t48: `<span>Inspection · MV3</span><i style="--p:.82"></i><small>expires in 12 days</small>`,
      t49: `Quotes`,
      t50: `Sent as a link: the client opens it, accepts it or asks for changes in one click. And if they don't reply, they get a reminder automatically.`,
      t51: `<span class="h">Sent</span><span class="a">Review</span><span>Accepted</span>`,
      t52: `Technology`,
      t53: `Laptops, phones, lines, MiFis and licences, each with its owner. When someone leaves, the list of what they need to hand back is ready.`,
      t54: `Crew and shoots`,
      t55: `Who's going out to shoot, for how many hours and on which project. The team chat, with the quote or the van pinned in the conversation.`,
      t56: `Finance, Excel and Power BI`,
      t57: `The quote pipeline, what's been invoiced and what's still to be paid, with an Excel file with charts ready to present. And if your management lives in Power BI, the data is live.`,
      t58: `<span class="hexito"></span>How it works`,
      t59: `Three steps and <span class="gris">the warehouse sorts itself out.</span>`,
      t61: `Upload what you already have`,
      t62: `Your gear spreadsheet, your vehicles and your crew. bulx sorts it by department and gives everything its own code.`,
      t64: `Stick on the QR labels`,
      t65: `Whoever takes a van or a case scans the sticker with their phone. No account, no odd apps: it records who, when and for which shoot.`,
      t67: `Quote and book`,
      t68: `With the catalogue at hand, the quote is ready in minutes and the gear is booked for those dates. Nothing goes out twice.`,
      t69: `<span class="hexito"></span>A shooting day`,
      t70: `From 7:00 to 20:30, <span class="gris">without a single “who's got the…?” call.</span>`,
      t72: `Picking up the van`,
      t73: `Marta scans the QR on the door of MV2. It records who's driving it, the mileage and which shoot it's for.`,
      t75: `The gear goes out`,
      t76: `The lighting kit's cases leave the warehouse. The quote already knew which ones were going, and the truck weight is added up.`,
      t78: `Something breaks`,
      t79: `A blown tail light. A damage report from the phone, with a photo, and the garage sees it before the van is back.`,
      t81: `The client accepts`,
      t82: `They open the link to next shoot's quote and accept it. The gear is booked for those dates.`,
      t84: `Everything comes home`,
      t85: `It's scanned on the way back. If a case is missing, it flags itself; if not, tomorrow everything is where it should be.`,
      t86: `<span class="hexito"></span>The change`,
      t87: `Less Excel, <span class="gris">less WhatsApp.</span>`,
      t88: `Before`,
      t89: `A gear spreadsheet nobody keeps up to date`,
      t90: `Asking for the van in the WhatsApp group`,
      t91: `The vehicle inspection date on a sticky note`,
      t92: `“Who's got the 17" monitor?”`,
      t93: `The quote, in a PDF lost somewhere in email`,
      t94: `Every item with its record, photo and QR`,
      t95: `Bookings on a timeline everyone can see`,
      t96: `A reminder before any document expires`,
      t97: `Who has it, since when and for which shoot`,
      t98: `A link the client accepts in one click`,
      t99: `<span class="hexito negro"></span>On iPhone and iPad`,
      t100: `The warehouse fits<br>in your pocket.`,
      t101: `Scan, book a van with a swipe, log your hours or check what's free tomorrow, standing on the loading dock. With Face ID and phone notifications.`,
      t102: `QR scanner for gear and vehicles`,
      t103: `Guided bookings by day and vehicle type`,
      t104: `Team chat with quote and gear cards`,
      t105: `<b class="hx negro"></b><span>MV2 booked<small>14 – 16 Oct · Shoot in Sóller</small></span>`,
      t106: `<b class="hx amarillo"></b><span>Scanned<small>ARRI Alexa Mini · out to a shoot</small></span>`,
      t107: `<b class="hx amarillo"></b><span>Quote accepted<small>PRESUP-2026-106 · 2 min ago</small></span>`,
      t108: `<small>Good morning</small><b>Palma Pictures</b>`,
      t109: `<small>Sunday 18</small><b>51</b><span>shooting days this year</span>`,
      t110: `<b>29</b><span>vehicles free</span>`,
      t111: `<b>787</b><span>in the warehouse</span>`,
      t112: `<span class="hx amarillo"></span>Scan`,
      t113: `<b class="hx amarillo"></b><span>MV2 · Vito<small>With you until Thursday</small></span>`,
      t114: `<b class="hx negro"></b><span>SkyPanel S60 kit<small>4 cases · 38 kg</small></span>`,
      t115: `<b class="hx gris"></b><span>Your hours today<small>9 h · Shoot in Sóller</small></span>`,
      t116: `<span class="hexito"></span>Security`,
      t117: `Built to pass <span class="gris">an audit.</span>`,
      t118: `Your production data is yours. bulx treats it that way.`,
      t119: `<b>Sign in with Microsoft</b><span>Your team signs in with their company account, with Microsoft's two-step verification.</span>`,
      t120: `<b>6-digit code</b><span>For anyone using a password: an authenticator app on the phone, no SMS.</span>`,
      t121: `<b>Permissions by area</b><span>Production, fleet, warehouse or IT: everyone sees their own part and nothing else.</span>`,
      t122: `<b>Everything is logged</b><span>Who changed what and when, in an activity log that can't be deleted.</span>`,
      t123: `<b>Servers in Europe</b><span>Data is stored in Frankfurt, with a backup in the database and off anyone's computer.</span>`,
      t124: `<b>Links that expire</b><span>Anything shared externally —a quote, a calendar— can be revoked whenever you want.</span>`,
      t125: `<span class="hexito"></span>Fits in`,
      t126: `Works well <span class="gris">with what you already use.</span>`,
      t128: `Sign in with your company account`,
      t130: `Import and export, with charts`,
      t132: `Your data, live`,
      t133: `iPhone and iPad`,
      t134: `With Face ID and notifications`,
      t135: `Email`,
      t136: `Quotes and reminders`,
      t137: `QR labels`,
      t138: `You print them, on any printer`,
      t139: `<span class="hexito"></span>FAQ`,
      t140: `What people <span class="gris">usually ask us.</span>`,
      t141: `Missing yours? Write to us at <a href="mailto:info@stokit.es">info@stokit.es</a>.`,
      t142: `Do I need to install anything?`,
      t143: `No. bulx is a website: it opens in the browser on the computer you already use. The iPhone and iPad app is for whoever is out on location or in the warehouse, and it's optional.`,
      t144: `Can I bring my gear spreadsheet?`,
      t145: `Yes. Upload it as it is and bulx sorts it by department and gives every item its code. Anything that doesn't fit is shown to you for review.`,
      t146: `Who sees what?`,
      t147: `Each person sees their own areas: production, fleet, warehouse or technology. Prices and finance are only visible to whoever needs them.`,
      t148: `Where is my data?`,
      t149: `On servers in Frankfurt, in Europe, with backups. And every change is logged: who, what and when.`,
      t150: `Is it for small production companies too?`,
      t151: `It was born in a production company in Mallorca, out of the day-to-day of real shoots. If you have gear, vans or people going out to shoot, it's for you.`,
      t152: `How much does it cost?`,
      t153: `It depends on how much gear and how many people. We'll tell you in the demo, with clear numbers and no small print.`,
      t154: `Shall we try it with your gear?`,
      t155: `We'll show you bulx with your own inventory and fleet in half an hour. No commitment and nothing to install.`,
      t156: `<a class="btn btn-amarillo btn-grande" href="mailto:info@stokit.es?subject=I%20want%20to%20see%20bulx">Book a demo <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" id="entrar" href="#entrar">Already a client · Log in</a>`,
      t157: `Inventory and production for production companies.`,
      t158: `<b>Product</b><a href="#producto">Gear</a><a href="#producto">Fleet</a><a href="#producto">Quotes</a><a href="#app">App</a>`,
      t159: `<b>bulx</b><a href="#como">How it works</a><a href="#dia">A shooting day</a><a href="#seguridad">Security</a><a href="#preguntas">FAQ</a><a href="#demo">Contact</a>`,
      t160: `© 2026 bulx.es · Logo designed by <b>Xavi Murillo</b>`,
    },

    de: {
      _titulo: 'bulx · Inventar und Produktion für Produktionsfirmen',
      _desc: 'bulx: Equipment, Fuhrpark, Angebote und Team einer Produktionsfirma an einem Ort. Im Web und auf dem iPhone.',
      _secciones: 'Bereiche', _ventana: 'So sieht bulx von innen aus', _con: 'Mit bulx',
      t1: `<a href="#producto">Produkt</a> <a href="#dia">Ein Tag</a> <a href="#app">App</a> <a href="#seguridad">Sicherheit</a> <a href="#preguntas">Fragen</a>`,
      t2: `<a class="btn btn-texto" href="#entrar">Anmelden</a> <a class="btn btn-amarillo" href="#demo">Demo anfragen</a>`,
      t3: `<span class="hexito"></span>Inventar und Produktion`,
      t4: `Der ganze Dreh,<br>in einer einzigen <span class="subrayado">Wabe.</span>`,
      t5: `Equipment, Fuhrpark, Angebote und Team deiner Produktionsfirma – alles in seiner eigenen Zelle und alles verbunden. Im Web und auf dem iPhone.`,
      t6: `<a class="btn btn-amarillo btn-grande" href="#demo">Demo anfragen <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" href="#como">So funktioniert's</a>`,
      t7: `Entstanden in einer Produktionsfirma auf Mallorca, für den Alltag am Set.`,
      t8: `<span>Equipment</span>`, t9: `<span>Fuhrpark</span>`, t10: `<span>Dreh</span>`,
      t11: `<i></i><i></i><i></i><span>bulx.es · Fuhrpark-Kalender</span>`,
      t12: `<b class="hx"></b>Start`, t13: `<b class="hx"></b>Projekte`, t14: `<b class="hx"></b>Angebote`, t15: `Fuhrpark`,
      t16: `<b class="hx"></b>Fahrzeuge`, t17: `<b class="hx"></b>Kalender`, t18: `Equipment`, t19: `<b class="hx"></b>Inventar`, t20: `<b class="hx"></b>QR-Etiketten`,
      t21: `Fuhrpark`, t22: `Buchungskalender`, t23: `<span class="on">Woche</span><span>Monat</span>`,
      t24: `<span></span><span>M</span><span>D</span><span>M</span><span>D</span><span>F</span><span class="finde">S</span><span class="finde">S</span>`,
      t25: `<span>MV1 · Vito</span><i class="b amarillo" style="--d:1;--l:3">Netflix-Werbespot</i>`,
      t26: `<span>MV2 · Vito</span><i class="b negro" style="--d:2;--l:4">HBO-Serie</i>`,
      t27: `<span>W1 · Sprinter</span><i class="b amarillo" style="--d:0;--l:2">Kostüm</i><i class="b gris" style="--d:4;--l:1">Werkstatt</i>`,
      t28: `<span>GC3 · PickUp</span><i class="b negro" style="--d:3;--l:3">Motivsuche</i>`,
      t29: `<span>UV1 · Vito</span><i class="b amarillo" style="--d:5;--l:2">Wochenenddreh</i>`,
      t30: `<small>Heute freie Fahrzeuge</small><b>21<em>von 29</em></b>`,
      t31: `<small>Equipment im Lager</small><b>92<em>%</em></b>`,
      t32: `<small>Offene Angebote</small><b>6</b>`,
      t33: `<span class="hexito"></span>Heute bei Palma Pictures, der Produktionsfirma, in der bulx entstanden ist`,
      t34: `<b data-cuenta="711">711</b><span>Artikel mit Datenblatt und QR</span>`,
      t35: `<b data-cuenta="29">29</b><span>Fahrzeuge in einem Kalender</span>`,
      t36: `<b data-cuenta="180">180</b><span>Menschen in Team und Crew</span>`,
      t37: `<b data-cuenta="51">51</b><span>Drehtage bisher in 2026</span>`,
      t38: `<span class="hexito"></span>Das Produkt`,
      t39: `Sechs Zellen. <span class="gris">Ein Bienenstock.</span>`,
      t40: `Jeder Bereich hat seinen Platz, aber alle reden miteinander: Das Angebot weiß, welches Equipment rausgeht, der Kalender weiß, welcher Transporter in der Werkstatt steht, und das Team weiß, welcher Dreh ansteht.`,
      t41: `Equipment und Inventar`,
      t42: `Jede Kiste, jede Leuchte, jede Kamera mit Datenblatt, Foto und QR-Code. Kits mit ihrem Inhalt, Maße und Gewicht für den LKW – und auf einen Blick, was draußen, im Lager oder in der Werkstatt ist.`,
      t43: `<b class="hx amarillo"></b><span>ARRI Alexa Mini<small>Kamera · 1 Stk.</small></span><em class="ok">Im Lager</em>`,
      t44: `<b class="hx negro"></b><span>SkyPanel-S60-Kit<small>Licht · 4 Stk.</small></span><em class="uso">Im Einsatz</em>`,
      t45: `<b class="hx gris"></b><span>Dolly Fisher 10<small>Grip · 1 Stk.</small></span><em class="mal">Werkstatt</em>`,
      t46: `Fuhrpark`,
      t47: `Buchungen auf einer Zeitleiste, TÜV und Versicherung mit Erinnerung, Schadensmeldungen über den QR an der Tür und eine Karte, wo jedes Fahrzeug steht.`,
      t48: `<span>TÜV · MV3</span><i style="--p:.82"></i><small>läuft in 12 Tagen ab</small>`,
      t49: `Angebote`,
      t50: `Werden als Link verschickt: Der Kunde öffnet ihn, nimmt an oder bittet mit einem Klick um Änderungen. Und wenn er nicht antwortet, wird er automatisch erinnert.`,
      t51: `<span class="h">Gesendet</span><span class="a">Prüfung</span><span>Angenommen</span>`,
      t52: `Technik`,
      t53: `Laptops, Handys, Leitungen, MiFis und Lizenzen – jeweils mit Besitzer. Wenn jemand geht, steht die Liste dessen, was zurückzugeben ist, schon bereit.`,
      t54: `Team und Drehs`,
      t55: `Wer zum Dreh rausgeht, wie viele Stunden und für welches Projekt. Der Team-Chat, mit Angebot oder Transporter direkt im Gespräch.`,
      t56: `Finanzen, Excel und Power BI`,
      t57: `Die Angebots-Pipeline, was abgerechnet ist und was noch offen ist – mit einer Excel-Datei mit Diagrammen, fertig zum Vorzeigen. Und wenn deine Geschäftsführung mit Power BI arbeitet, kommen die Daten live.`,
      t58: `<span class="hexito"></span>So funktioniert's`,
      t59: `Drei Schritte, <span class="gris">und das Lager ordnet sich von selbst.</span>`,
      t61: `Lade hoch, was du schon hast`,
      t62: `Deine Equipment-Liste in Excel, deine Fahrzeuge und dein Team. bulx sortiert alles nach Abteilungen und gibt jedem Teil seinen Code.`,
      t64: `QR-Etiketten aufkleben`,
      t65: `Wer einen Transporter oder eine Kiste nimmt, scannt den Aufkleber mit dem Handy. Kein Konto, keine seltsamen Apps: Es wird festgehalten, wer, wann und für welchen Dreh.`,
      t67: `Angebot erstellen und buchen`,
      t68: `Mit dem Katalog zur Hand steht das Angebot in Minuten, und das Equipment ist für diese Tage reserviert. Nichts geht doppelt raus.`,
      t69: `<span class="hexito"></span>Ein Drehtag`,
      t70: `Von 7:00 bis 20:30 Uhr, <span class="gris">ohne einen einzigen „Wer hat…?“-Anruf.</span>`,
      t72: `Den Transporter abholen`,
      t73: `Marta scannt den QR an der Tür des MV2. Festgehalten wird, wer ihn fährt, mit welchem Kilometerstand und für welchen Dreh.`,
      t75: `Das Equipment geht raus`,
      t76: `Die Kisten des Licht-Kits verlassen das Lager. Das Angebot wusste schon, welche mitgehen, und das Gewicht für den LKW ist zusammengerechnet.`,
      t78: `Etwas geht kaputt`,
      t79: `Ein kaputtes Rücklicht. Die Schadensmeldung kommt vom Handy, mit Foto, und die Werkstatt hat sie vor sich, bevor der Transporter zurück ist.`,
      t81: `Der Kunde nimmt an`,
      t82: `Er öffnet den Link zum Angebot für den nächsten Dreh und nimmt es an. Das Equipment ist für diese Tage reserviert.`,
      t84: `Alles kommt zurück`,
      t85: `Bei der Rückkehr wird gescannt. Fehlt eine Kiste, fällt es sofort auf; wenn nicht, ist morgen alles da, wo es hingehört.`,
      t86: `<span class="hexito"></span>Der Unterschied`,
      t87: `Weniger Excel, <span class="gris">weniger WhatsApp.</span>`,
      t88: `Vorher`,
      t89: `Eine Equipment-Tabelle, die niemand pflegt`,
      t90: `Den Transporter in der WhatsApp-Gruppe anfragen`,
      t91: `Der TÜV-Termin auf einem Post-it`,
      t92: `„Wer hat den 17"-Monitor?“`,
      t93: `Das Angebot als PDF, das im Postfach verschwindet`,
      t94: `Jedes Teil mit Datenblatt, Foto und QR`,
      t95: `Buchungen auf einer Zeitleiste, die alle sehen`,
      t96: `Eine Erinnerung, bevor irgendein Dokument abläuft`,
      t97: `Wer es hat, seit wann und für welchen Dreh`,
      t98: `Ein Link, den der Kunde mit einem Klick annimmt`,
      t99: `<span class="hexito negro"></span>Auf iPhone und iPad`,
      t100: `Das Lager passt<br>in die Hosentasche.`,
      t101: `Scannen, einen Transporter per Wischgeste buchen, Stunden eintragen oder schauen, was morgen frei ist – im Stehen an der Laderampe. Mit Face ID und Benachrichtigungen aufs Handy.`,
      t102: `QR-Scanner für Equipment und Fahrzeuge`,
      t103: `Geführte Buchungen nach Tag und Fahrzeugtyp`,
      t104: `Team-Chat mit Karten für Angebote und Equipment`,
      t105: `<b class="hx negro"></b><span>MV2 gebucht<small>14.–16. Okt. · Dreh in Sóller</small></span>`,
      t106: `<b class="hx amarillo"></b><span>Gescannt<small>ARRI Alexa Mini · geht zum Dreh</small></span>`,
      t107: `<b class="hx amarillo"></b><span>Angebot angenommen<small>PRESUP-2026-106 · vor 2 Min.</small></span>`,
      t108: `<small>Guten Morgen</small><b>Palma Pictures</b>`,
      t109: `<small>Sonntag, 18.</small><b>51</b><span>Drehtage in diesem Jahr</span>`,
      t110: `<b>29</b><span>Fahrzeuge frei</span>`,
      t111: `<b>787</b><span>im Lager</span>`,
      t112: `<span class="hx amarillo"></span>Scannen`,
      t113: `<b class="hx amarillo"></b><span>MV2 · Vito<small>Bei dir bis Donnerstag</small></span>`,
      t114: `<b class="hx negro"></b><span>SkyPanel-S60-Kit<small>4 Kisten · 38 kg</small></span>`,
      t115: `<b class="hx gris"></b><span>Deine Stunden heute<small>9 Std. · Dreh in Sóller</small></span>`,
      t116: `<span class="hexito"></span>Sicherheit`,
      t117: `Gemacht, um <span class="gris">ein Audit zu bestehen.</span>`,
      t118: `Deine Produktionsdaten gehören dir. bulx behandelt sie auch so.`,
      t119: `<b>Anmelden mit Microsoft</b><span>Dein Team meldet sich mit dem Firmenkonto an, mit der Zwei-Faktor-Bestätigung von Microsoft.</span>`,
      t120: `<b>6-stelliger Code</b><span>Für alle mit Passwort: eine Authenticator-App auf dem Handy, ohne SMS.</span>`,
      t121: `<b>Rechte nach Bereich</b><span>Produktion, Fuhrpark, Lager oder IT: Jeder sieht seinen Teil und sonst nichts.</span>`,
      t122: `<b>Alles wird protokolliert</b><span>Wer was wann geändert hat, in einem Aktivitätsprotokoll, das sich nicht löschen lässt.</span>`,
      t123: `<b>Server in Europa</b><span>Die Daten liegen in Frankfurt, mit Sicherung in der Datenbank und nicht auf irgendeinem Rechner.</span>`,
      t124: `<b>Links, die ablaufen</b><span>Was nach außen geteilt wird – ein Angebot, ein Kalender –, lässt sich jederzeit widerrufen.</span>`,
      t125: `<span class="hexito"></span>Passt dazu`,
      t126: `Versteht sich gut <span class="gris">mit dem, was ihr schon nutzt.</span>`,
      t128: `Anmeldung mit dem Firmenkonto`,
      t130: `Import und Export mit Diagrammen`,
      t132: `Die Daten, live`,
      t133: `iPhone und iPad`,
      t134: `Mit Face ID und Benachrichtigungen`,
      t135: `E-Mail`,
      t136: `Angebote und Erinnerungen`,
      t137: `QR-Etiketten`,
      t138: `Druckst du selbst, auf jedem Drucker`,
      t139: `<span class="hexito"></span>Fragen`,
      t140: `Was wir <span class="gris">oft gefragt werden.</span>`,
      t141: `Deine ist nicht dabei? Schreib uns an <a href="mailto:info@stokit.es">info@stokit.es</a>.`,
      t142: `Muss ich etwas installieren?`,
      t143: `Nein. bulx ist eine Website: Sie öffnet sich im Browser des Rechners, den du ohnehin nutzt. Die App für iPhone und iPad ist für alle unterwegs oder im Lager – und optional.`,
      t144: `Kann ich meine Equipment-Liste aus Excel mitbringen?`,
      t145: `Ja. Du lädst sie einfach hoch, und bulx sortiert sie nach Abteilungen und gibt jedem Teil seinen Code. Was nicht passt, zeigt es dir zur Kontrolle.`,
      t146: `Wer sieht was?`,
      t147: `Jede Person sieht ihre Bereiche: Produktion, Fuhrpark, Lager oder Technik. Preise und Finanzen sieht nur, wer sie sehen muss.`,
      t148: `Wo liegen meine Daten?`,
      t149: `Auf Servern in Frankfurt, in Europa, mit Sicherung. Und jede Änderung wird protokolliert: wer, was und wann.`,
      t150: `Passt das auch für eine kleine Produktionsfirma?`,
      t151: `Es ist in einer Produktionsfirma auf Mallorca entstanden, aus dem echten Drehalltag. Wenn du Equipment, Transporter oder Leute hast, die zum Dreh rausgehen, passt es.`,
      t152: `Was kostet es?`,
      t153: `Das hängt davon ab, wie viel Equipment und wie viele Leute. Wir sagen es dir in der Demo, mit klaren Zahlen und ohne Kleingedrucktes.`,
      t154: `Schauen wir es uns mit deinem Equipment an?`,
      t155: `Wir zeigen dir bulx mit deinem eigenen Inventar und Fuhrpark in einer halben Stunde. Unverbindlich und ohne Installation.`,
      t156: `<a class="btn btn-amarillo btn-grande" href="mailto:info@stokit.es?subject=Ich%20m%C3%B6chte%20bulx%20sehen">Demo anfragen <span aria-hidden="true">→</span></a> <a class="btn btn-claro btn-grande" id="entrar" href="#entrar">Schon Kunde · Anmelden</a>`,
      t157: `Inventar und Produktion für Produktionsfirmen.`,
      t158: `<b>Produkt</b><a href="#producto">Equipment</a><a href="#producto">Fuhrpark</a><a href="#producto">Angebote</a><a href="#app">App</a>`,
      t159: `<b>bulx</b><a href="#como">So funktioniert's</a><a href="#dia">Ein Drehtag</a><a href="#seguridad">Sicherheit</a><a href="#preguntas">Fragen</a><a href="#demo">Kontakt</a>`,
      t160: `© 2026 bulx.es · Logo gestaltet von <b>Xavi Murillo</b>`,
    },
  };

  const IDIOMAS = ['es', 'en', 'de'];
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
    caja.innerHTML = '<i class="idioma-marca" aria-hidden="true"></i>' + IDIOMAS.map(l =>
      `<button type="button" data-lang="${l}" lang="${l}" title="${NOMBRE[l]}" aria-pressed="false">${l.toUpperCase()}</button>`).join('');
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
