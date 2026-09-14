# FPMC – Film, Musik und klare Anfragewege

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
- `src/refinement.css`: verfeinerte Gestaltung, klare Typografieskala, neue Startseite, Anfrageformular und mobile Kontaktaktion.
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

Der E-Mail-Assistent ist absichtlich ein **Entwurfsassistent**: Eingaben werden zunächst im Browser sichtbar zur Prüfung aufbereitet. Die Nutzer können den Text kopieren oder an ihr E-Mail-Programm übergeben. Erst dort senden sie die Nachricht an FPMC. Name und Projektidee sind die Pflichtangaben; eine abweichende Antwortadresse, Organisation und Zeitraum sind optional aufklappbar. Es gibt keine irreführende Eingangsbestätigung und keinen vorgetäuschten Serverversand. Ein Formular-Backend oder ein Newsletter-Versanddienst war im Download nicht enthalten. Der unbestätigte Newsletter-POST der alten Seite wurde nicht übernommen; der Labelbereich verweist stattdessen auf die bestehenden Kanäle.

Die Website wird öffentlich über OpenAI Sites bereitgestellt. Die Originaldateien im Downloadordner bleiben erhalten. Die lokale Vorschau liefert weiterhin `X-Robots-Tag: noindex, nofollow`; diese Einstellung des lokalen Servers wird nicht in die statische Veröffentlichung übernommen. Die neue öffentliche Adresse steht in `site.config.json`. Ein späterer Domainwechsel erfordert eine entsprechende Anpassung und einen neuen Build.

Die Weiterleitungen liegen für das statische Hosting in `dist/_redirects`. Die Datenschutzerklärung beschreibt die Bereitstellung über OpenAI Sites und Cloudflare. Unternehmensdaten, steuerliche Preisinformationen und verbindliche Leistungs-/Vertragsbedingungen stammen aus dem bisherigen Auftritt. Es wurde keine Rechtsprüfung vorgenommen.

## Medien und Inhalte

Die Bilder und Videos stammen aus dem bestehenden FPMC-Auftritt. Das Musikvideo-Vorschaubild stammt aus dem offiziellen verlinkten YouTube-Video. Künstlerportrait und Behind-the-scenes-Material werden nicht als unbelegte Szenen dieses veröffentlichten Videos ausgegeben. Das Plattenspielermotiv ist als atmosphärisches Motiv gekennzeichnet. Ein Mediennachweis liegt in `MEDIEN.md`. Die durchgeführten Funktions-, Darstellungs- und HTTP-Prüfungen sind in `PRUEFUNG.md` dokumentiert.

Bestehende Preise wurden als Orientierung beibehalten. Pauschale Versprechen wie garantierte Reichweite, DSGVO-Konformität, Antwort in Minuten und universelle 48-Stunden-Produktion wurden durch konkrete Anfrageführung ersetzt.

## Aktuelle Gestaltung und Anfrageführung

Der Auftritt verbindet eine ruhige Gestaltung mit dem Charakter eines unabhängigen Film- und Musikhauses: Papierweiß, dunkle Typografie, ein zurückhaltender roter Akzent und echte Arbeiten. Space Grotesk bildet die klare Grundschrift; Instrument Serif setzt ausgewählte redaktionelle Akzente. Beide werden lokal geladen.

Die Startseite erklärt unmittelbar Film-, Musikvideo- und Audioproduktion für Artists, Labels und Marken. Der erste sichtbare Bereich kombiniert diese Aussage mit einer realen Arbeit und den beiden Wegen „Projekt anfragen“ und „Arbeiten ansehen“. Der übergroße FPMC-Schriftzug, das endlose Textband und der großflächig rote Labelabschnitt sind entfallen. Es folgen drei klar verlinkte Produktionsbereiche, ein ergänzender Web-/Digitalhinweis, die Menschen hinter FPMC und ein kompakter Labelabschnitt.

Projektarchiv, Leistungen, Studio, Label und Detailseiten verwenden einheitlichere Abstände und eine abgestimmte Schriftgröße. Film, Musikvideo und Audio behalten ihre eigenen Bildkompositionen, das Label seinen dunklen Charakter. Die gemeinsame Einladung am Seitenende erläutert den nächsten Schritt und führt zu einer passenden Anfrage oder zur direkten E-Mail.

Der hervorgehobene Anfragebutton ist auf Desktop und Smartphone direkt in der Navigation erreichbar. Leistungslinks übernehmen die passende Projektart ins Formular. Paketlinks übergeben Simple, Professional, Cinematic, Digital Boost beziehungsweise Spec-Ad. Die Auswahl ist dort sichtbar und änderbar. Allgemeine Anfragen beginnen mit „Eine erste Idee“. Jede Änderung macht einen bereits erzeugten Entwurf ungültig und setzt dessen Kopierstatus zurück.

Das Formular fragt zunächst nach Projektart, Name und Idee. Weitere Angaben bleiben optional. Es erklärt bereits vor der Eingabe, dass es eine Nachricht für das eigene E-Mail-Programm vorbereitet. Ein ungültiger Wert im eingeklappten optionalen Bereich öffnet diesen automatisch zur Korrektur. Es werden keine Nachrichten automatisch versendet.

Das originale achtsekündige Behind-the-scenes-Video wird auf Start- und Studioseite erst in Sichtnähe geladen. Es bleibt stumm und lässt sich manuell pausieren. Keine neuen Fotos, Filmprojekte, Referenzen, Kundenstimmen oder Erfolgszahlen wurden erfunden.

Der aktuelle statische Check umfasst 19 Seiten, 447 interne Linkverweise und 131 Medienverweise. Breadcrumb-Daten und strukturierte Leistungsdaten ergänzen die individuellen Metadaten. Die Anfrageführung wurde vereinfacht; eine gemessene Steigerung der Conversion-Rate wird nicht behauptet.

## Animationen

- Kürzere Titelauftritte und einmalige Bildenthüllungen beim Eintritt in den sichtbaren Bereich.
- Gestaffelte Text- und Zeilenauftritte sowie eine geringe, an den Bildüberstand angepasste Tiefenbewegung.
- Bewegliche Projektpfeile, fein animierte Linien und Hoverzustände.
- Animiertes Umordnen des Projektarchivs, ein aufklappendes Mobilmenü und weich öffnende FAQ-Antworten.
- Native Übergänge zwischen Seiten in Browsern mit Unterstützung für Cross-document View Transitions. Andere Browser navigieren weiterhin normal.

Auf ausdrücklichen Wunsch gibt es keine automatische Reduced-Motion-, No-Motion- oder Save-Data-Abschaltung. Lesbare Inhalte ohne JavaScript und manuelle Videosteuerungen bleiben erhalten. Die Bewegung erfordert keine externe Animationsbibliothek.

Technische Referenzen: [MDN: Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [MDN: @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition).
