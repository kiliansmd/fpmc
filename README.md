# FPMC – Website mit Art Direction und Motion

Die vollständig bearbeitbare Fassung des überarbeiteten Auftritts. Grundlage sind der bereitgestellte Website-Download, die ursprünglichen öffentlichen FPMC-Inhalte und die Ergebnisse des Website-Audits vom 14.09.2026.

## Lokal öffnen

Veröffentlichungsadresse dieser Fassung: **https://fpmc-house.sdjnksd.chatgpt.site**

Lokale Vorschau nach dem Start: **http://localhost:4179**

Zum erneuten Starten im Ordner dieser Datei:

```sh
npm run build
npm start
```

Node.js wird benötigt. Es sind keine zusätzlichen Pakete und keine Installation notwendig. Der Server ist ausschließlich an die lokale Adresse 127.0.0.1 gebunden. Falls Port 4179 belegt ist, lässt sich ein anderer über `PORT=4180 npm start` wählen.

## Dateien

- `src/build.mjs`: Seiten, Inhalte, gemeinsame Komponenten und Metadaten; erzeugt die statischen HTML-Seiten.
- `src/art.mjs`: Art Direction für Startseite, Kontakt, Seiteneinstiege, Navigation, Footer und Bewegtbild.
- `src/styles.css`: Gestaltung, responsive Ansichten, Schriftdefinitionen und Zustände.
- `src/motion.css` und `src/motion.js`: Schriftauftritte, Bildenthüllungen, Scrolltiefe, Interaktionen und Seitenübergänge.
- `site.config.json`: Veröffentlichungs-Origin für Canonicals, Sitemap und strukturierte Daten.
- `src/site.js`: mobiles Menü, Projektfilter, bedarfsgesteuerter Videoplayer und E-Mail-Assistent.
- `dist/`: fertige Website inklusive lokal gespeicherter Medien und Schriften.
- `serve.mjs`: lokaler Server mit Redirects, Medien-Range-Requests und echten 404-Antworten.
- `src/check.mjs`: Prüfung von Seiten, Metadaten, internen Links, Ankern, Medienverweisen und strukturierten Daten.
- `LIZENZEN/`: Original-Lizenztexte und Herkunftsnachweise der neu eingebundenen Schriften.

Nach Änderungen `npm run build` ausführen und die Browseransicht neu laden. `npm run check` prüft die erzeugte Website.

## Überarbeitung

- Einheitliche Navigation: Projekte, Leistungen, Studio, Label und hervorgehobener Projektkontakt.
- 19 statische Inhaltsseiten mit individuellen Titeln und Beschreibungen.
- Eigenständige Seiten für Filmproduktion, Musikvideoproduktion, Audio sowie Web/Digital.
- Projektübersicht mit Filtern, Redstar-Radi-Projektseite und fünf Webprojektseiten.
- Vorhandene Unternehmens-/Teamdaten integriert; keine erfundenen Kundenstimmen, Erfolgszahlen oder Produktionscredits.
- Deutsche Inhalte, aktualisierter Releasezustand, konsistente Anfragewege.
- Darstellung für Desktop und Smartphone, mobile Navigation und Tastaturfokus.
- Inhalte und Navigation bereits im HTML; keine JavaScript-Abhängigkeit für das Lesen der Website.
- Canonicals, XML-Sitemap, robots.txt, Organization-/Service-/Breadcrumb- sowie Video-Daten.
- Alte Pfade `/arbeit`, `/connect`, `/v0` und `/v1` werden lokal passend weitergeleitet.
- Eigene Schriften und Bildmedien; YouTube wird erst nach einem ausdrücklichen Klick geladen. Spotify und Social Media sind externe Links.

## Kontakt und Veröffentlichungsstand

Der E-Mail-Assistent ist absichtlich ein **Entwurfsassistent**: Eingaben bleiben zunächst im Browser, werden sichtbar zur Prüfung aufbereitet und erst durch das bewusste Absenden im E-Mail-Programm übermittelt. Es gibt keine irreführende Eingangsbestätigung und keinen vorgetäuschten Serverversand. Ein Formular-Backend oder ein Newsletter-Versanddienst war im Download nicht enthalten. Der unbestätigte Newsletter-POST der alten Seite wurde nicht übernommen; der Labelbereich verweist stattdessen auf die bestehenden Kanäle.

Die Website ist für die öffentliche Bereitstellung über OpenAI Sites vorbereitet. Die Originaldateien im Downloadordner bleiben erhalten. Die lokale Vorschau liefert weiterhin `X-Robots-Tag: noindex, nofollow`; diese Einstellung des lokalen Servers wird nicht in die statische Veröffentlichung übernommen. Die neue öffentliche Adresse steht in `site.config.json`. Ein späterer Domainwechsel erfordert eine entsprechende Anpassung und einen neuen Build.

Die Weiterleitungen liegen für das statische Hosting in `dist/_redirects`. Die Datenschutzerklärung beschreibt die Bereitstellung über OpenAI Sites und Cloudflare. Unternehmensdaten, steuerliche Preisinformationen und verbindliche Leistungs-/Vertragsbedingungen stammen aus dem bisherigen Auftritt. Es wurde keine Rechtsprüfung vorgenommen.

## Medien und Inhalte

Die Bilder und Videos stammen aus dem bestehenden FPMC-Auftritt. Das Musikvideo-Vorschaubild stammt aus dem offiziellen verlinkten YouTube-Video. Künstlerportrait und Behind-the-scenes-Material werden nicht als unbelegte Szenen dieses veröffentlichten Videos ausgegeben. Das Plattenspielermotiv ist als atmosphärisches Motiv gekennzeichnet. Ein Mediennachweis liegt in `MEDIEN.md`. Die durchgeführten Funktions-, Darstellungs- und HTTP-Prüfungen sind in `PRUEFUNG.md` dokumentiert.

Bestehende Preise wurden als Orientierung beibehalten. Pauschale Versprechen wie garantierte Reichweite, DSGVO-Konformität, Antwort in Minuten und universelle 48-Stunden-Produktion wurden durch konkrete Anfrageführung ersetzt.

## Aktuelle Art Direction

Der Auftritt orientiert sich an einem unabhängigen Film- und Musikmagazin: große typografische Setzungen, Schwarz und Papierweiß, ein kräftiger roter Akzent und bewusst unterschiedliche Bildformate. Space Grotesk bildet die klare Grundschrift; Instrument Serif setzt ausgewählte redaktionelle Akzente. Beide werden lokal geladen.

Die Startseite beginnt mit einem großen FPMC-Schriftzug und einem originalen Filmframe. Es folgen eine Bild-/Ton-Komposition, Produktionsbereiche mit echtem Bewegtbild vom Set, das Team und ein roter Labelabschnitt. Das Projektarchiv ordnet die Referenzen asymmetrisch an. Film, Musikvideo und Audio haben unterschiedliche Bild- und Textkompositionen. Die Studioseite stellt die Menschen und den Produktionsprozess heraus; die Labelseite erhält einen dunklen, musikalischen Charakter. Der Kontaktbereich verbindet direkte Erreichbarkeit mit einem unmittelbar zugänglichen Formular in einer eigenen zweispaltigen Komposition.

Das originale achtsekündige Behind-the-scenes-Video wird auf Start- und Studioseite erst in Sichtnähe geladen. Es bleibt stumm und lässt sich manuell pausieren. Die automatischen Abschaltungen für reduzierte Bewegung und Datensparmodus wurden auf ausdrücklichen Wunsch entfernt. Keine neuen Fotos, Filmprojekte oder Referenzen wurden erfunden.

Die Detailseiten enthalten passende Projektfragen und Wege zu verwandten Leistungen. Webprojekte verlinken auf die nächste Referenz; die Redstar-Projektseite führt zu den zugehörigen Produktionsleistungen. Die Navigation bleibt mit JavaScript beim Scrollen erreichbar, eine zusätzliche Seitennavigation steht im Footer.

Paketlinks übergeben Simple, Professional, Cinematic, Digital Boost beziehungsweise Spec-Ad an die Anfrage. Die passende Auswahl ist dort sichtbar und änderbar und wird in den E-Mail-Entwurf übernommen. Allgemeine Anfragen beginnen mit „Eine erste Idee“. Ein geänderter Formularstand macht den alten Entwurf ungültig und entfernt dessen Kopierstatus.

Der aktuelle statische Check umfasst 19 Seiten, 428 interne Linkverweise und 131 Medienverweise. Breadcrumb-Daten und strukturierte Leistungsdaten ergänzen die individuellen Metadaten. Die laufende Vorschau zeigt diese aktuelle Fassung.

## Animationen der veröffentlichten Fassung

- Gestaffelter Auftritt der vier FPMC-Buchstaben und der Titelzeilen; danach Einleitung und Aktionen.
- Einmalige Bildenthüllungen und gestaffelte Text-/Zeilenauftritte beim Eintritt in den sichtbaren Bereich.
- Endlos laufendes typografisches Band auf der Startseite.
- An die Bildgröße angepasste Tiefenbewegung in Bildern, ohne das Scrollverhalten zu ersetzen.
- Bewegliche Projektpfeile, fein animierte Linien und Hoverzustände.
- Animiertes Umordnen des Projektarchivs, ein aufklappendes Mobilmenü und weich öffnende FAQ-Antworten.
- Native Übergänge zwischen Seiten in Browsern mit Unterstützung für Cross-document View Transitions. Andere Browser navigieren weiterhin normal.

Es gibt keine automatische Reduced-Motion-, No-Motion- oder Save-Data-Abschaltung. Lesbare Inhalte ohne JavaScript und manuelle Videosteuerungen bleiben erhalten. Die zusätzliche Bewegung erfordert keine externe Animationsbibliothek.

Technische Referenzen: [MDN: Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [MDN: @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition).
