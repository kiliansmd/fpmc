# FPMC – Film, Musik und klare Anfragewege

Die vollständig bearbeitbare Fassung des überarbeiteten Auftritts. Grundlage sind der bereitgestellte Website-Download, die ursprünglichen öffentlichen FPMC-Inhalte und die Ergebnisse des Website-Audits vom 14.09.2026.

## Lokal öffnen

Veröffentlichungsadresse dieser Fassung: **https://fpmc.meindigitalerbetrieb.de**

Lokale Vorschau nach dem Start: **http://localhost:4179**

Zum erneuten Starten im Ordner dieser Datei:

```sh
npm run build
npm start
```

Node.js wird benötigt. Es sind keine zusätzlichen Pakete und keine Installation notwendig. Der Server ist ausschließlich an die lokale Adresse 127.0.0.1 gebunden. Falls Port 4179 belegt ist, lässt sich ein anderer über `PORT=4180 npm start` wählen.

## Dateien

- `src/build.mjs`: Seiten, Inhalte, gemeinsame Komponenten und Metadaten; erzeugt die statischen HTML-Seiten.
- `src/icons.mjs`: einheitliche SVG-Pfeile, Play- und Menüsymbole ohne plattformabhängige Emoji-Glyphen.
- `src/adaptive.css`: abschließende responsive Gestaltung für Smartphone, Tablet, breite Monitore, kurze Fenster und Touch-Bedienung.
- `src/seo.mjs`: gemeinsame Social-Vorschau, Open-Graph-/X-Metadaten und verknüpfte Website-/Seiten-Daten.
- `src/art.mjs`: Art Direction für Startseite, Kontakt, Seiteneinstiege, Navigation, Footer und Bewegtbild.
- `src/styles.css`: Gestaltung, responsive Ansichten, Schriftdefinitionen und Zustände.
- `src/motion.css` und `src/motion.js`: Schriftauftritte, Bildenthüllungen, Scrolltiefe, Interaktionen und Seitenübergänge.
- `src/refinement.css`: verfeinerte Gestaltung, klare Typografieskala, neue Startseite, Anfrageformular und mobile Kontaktaktion.
- `src/responsive.css`: responsive Umbrüche, Touchflächen, sichere Bildschirmränder, mobiles Menü und lesbare Anfrageentwürfe.
- `src/bold.css`: aktuelle schwarze Gestaltung, Satoshi-Typografie, Graphitflächen, klare Abstände und angepasste mobile Ansichten.
- `site.config.json` und `src/config.mjs`: Veröffentlichungs-Origin und Indexierungsstatus. Vercel verwendet beim Build seine stabile Produktionsdomain.
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

Die aktuelle Website wird öffentlich über Vercel unter https://fpmc.meindigitalerbetrieb.de bereitgestellt. Sowohl die lokale Vorschau als auch Vercel liefern `X-Robots-Tag: noindex, nofollow`; zusätzlich enthält jede HTML-Seite eine entsprechende Meta-Anweisung. Die Produktionsadresse steht in `site.config.json`. Ein späterer Domainwechsel erfordert eine entsprechende Anpassung und einen neuen Build.

Vercel verwendet die Weiterleitungen in `vercel.json`. Die ältere Sites-Konfiguration in `dist/_redirects` bleibt für diesen separaten Auftritt erhalten. Die Datenschutzerklärung beschreibt die Bereitstellung über Vercel. Unternehmensdaten, steuerliche Preisinformationen und verbindliche Leistungs-/Vertragsbedingungen stammen aus dem bisherigen Auftritt. Es wurde keine Rechtsprüfung vorgenommen.

## Medien und Inhalte

Die Produktionsbilder und Videos stammen aus dem bestehenden FPMC-Auftritt. Die neue gemeinsame Social-Vorschau `dist/og.png` ist eine mit dem integrierten ImageGen-Werkzeug erstellte Markengrafik. Das Musikvideo-Vorschaubild stammt aus dem offiziellen verlinkten YouTube-Video. Künstlerportrait und Behind-the-scenes-Material werden nicht als unbelegte Szenen dieses veröffentlichten Videos ausgegeben. Das Plattenspielermotiv ist als atmosphärisches Motiv gekennzeichnet. Ein Mediennachweis liegt in `MEDIEN.md`. Die durchgeführten Funktions-, Darstellungs- und HTTP-Prüfungen sind in `PRUEFUNG.md` dokumentiert. Satoshi stammt unverändert aus dem offiziellen Fontshare-Paket und wird unter ITF Free Font License 2.0 lokal eingebunden; der Original-Lizenztext steht in `LIZENZEN/Satoshi-FFL.txt`.

Bestehende Preise wurden als Orientierung beibehalten. Pauschale Versprechen wie garantierte Reichweite, DSGVO-Konformität, Antwort in Minuten und universelle 48-Stunden-Produktion wurden durch konkrete Anfrageführung ersetzt.

## Aktuelle Gestaltung und Anfrageführung

Der Auftritt ist überwiegend schwarz. Feine Graphitabstufungen trennen Kontaktformular und Abschlussbereich; gebrochenes Weiß hebt Schrift und primäre Aktionen hervor. Interaktionen bleiben in der monochromen Farbskala. Satoshi Variable bildet die Hauptschrift: kräftige Überschriften, ruhig gesetzte Fließtexte und gut lesbare Bedienelemente. Die FPMC-Wortmarke bleibt in Space Grotesk. Beide Schriften werden lokal geladen; es werden keine Serifenschriften eingebunden. Dekorative Eyebrows, Nummerierungen und redundante Fülltexte sind aus dem HTML entfernt; sachliche Angaben wie Release-Datum, Preise und Formularhinweise bleiben erhalten.

Die Startseite stellt Film und Sound unmittelbar in den Mittelpunkt. Das originale Behind-the-scenes-Reel steht als Portraitfilm direkt neben „Film. Sound.“. Es lädt unmittelbar mit dem Einstieg, startet bei Sichtbarkeit stumm und bleibt über einen SVG-Regler pausierbar. Mobil stehen Titel und Film nebeneinander, Intro und Anfrage darunter. Direkt danach folgen das echte Redstar-Musikvideo und der Spotify-Zugang zum Track. Die drei bildgeführten Produktionsbereiche Film, Musikvideo und Sound führen zu den Leistungen; Web und Digital bleiben als Ergänzung erreichbar.

Film-, Musikvideo- und Audioseiten verwenden eigene große Bildräume. Auf der Filmseite läuft das originale BTS-Reel im Portraitformat. Die Musikvideoseite zeigt das offizielle Filmframe, die Audioseite das vorhandene atmosphärische Plattenspielermotiv. Die Audio-Referenz verbindet Künstlerportrait, tatsächlichen Titel und Hörzugang. Die Labelseite komponiert Release und Künstlerbild auf einer gemeinsamen dunklen Fläche; mobil werden beide lesbar gestapelt.

Projektarchiv und Filmkarten legen Titel und Produktionsangaben über die Filmfläche. Website-Projekte bleiben als Websites erkennbar. Studio, Kontakt, Anfrageeinladungen und Footer folgen der schwarzen, serifenlosen Gestaltung. Die primären Wege bleiben Produktion anfragen, Film ansehen und Musik hören. Keine Referenzen, Credits oder Erfolgszahlen wurden erfunden.

Der hervorgehobene Anfragebutton ist auf Desktop und Smartphone direkt in der Navigation erreichbar. Leistungslinks übernehmen die passende Projektart ins Formular. Paketlinks übergeben Simple, Professional, Cinematic, Digital Boost beziehungsweise Spec-Ad. Die Auswahl ist dort sichtbar und änderbar. Allgemeine Anfragen beginnen mit „Eine erste Idee“. Jede Änderung macht einen bereits erzeugten Entwurf ungültig und setzt dessen Kopierstatus zurück.

Der Kontaktbereich ist als offene zweispaltige Komposition ohne äußeren Formularkasten gestaltet. Die Eingabefelder bleiben klar begrenzt. Das Formular fragt zunächst nach Projektart, Name und Idee. Weitere Angaben bleiben optional. Es erklärt bereits vor der Eingabe, dass es eine Nachricht für das eigene E-Mail-Programm vorbereitet. Ein ungültiger Wert im eingeklappten optionalen Bereich öffnet diesen automatisch zur Korrektur. Es werden keine Nachrichten automatisch versendet.

Das originale achtsekündige Behind-the-scenes-Video wird auf Start-, Studio- und Filmproduktionsseite erst in Sichtnähe geladen. Es bleibt stumm und lässt sich manuell pausieren. Keine neuen Fotos, Filmprojekte, Referenzen, Kundenstimmen oder Erfolgszahlen wurden erfunden.

Die Labelseite führt direkt zu Artist, Release, Musikvideo und Spotify. Die Studioseite beginnt mit Teamprofil und originalem Drehmaterial, gefolgt von einer klaren Teamliste. Auf der Kontaktseite entfällt die redundante Anfrageeinladung unter dem Formular. Ein großer FPMC-Schriftzug bildet den Abschluss.

Die aktuelle Art Direction liegt in `src/direction.css`; die gemeinsamen Seitenelemente in `src/art.mjs`. Der statische Check umfasst 19 Seiten, 440 interne Linkverweise und 153 Asset-Verweise. Breadcrumb-Daten und strukturierte Leistungsdaten ergänzen die individuellen Metadaten. Die Anfrageführung wurde vereinfacht; eine gemessene Steigerung der Conversion-Rate wird nicht behauptet.

## Animationen

- Eine zentrale, kurze Auftrittsanimation je Element; Einblendungen beim Eintritt in den sichtbaren Bereich berücksichtigen den Ladezustand der Bilder.
- Gestaffelte Text- und Zeilenauftritte sowie eine geringe, an den Bildüberstand angepasste Tiefenbewegung.
- Bewegliche Projektpfeile, fein animierte Linien und Hoverzustände.
- Animiertes Umordnen des Projektarchivs, ein aufklappendes Mobilmenü und weich öffnende FAQ-Antworten.
- Kurze native Seitenüberblendungen mit stabiler Navigation in Browsern mit Unterstützung für Cross-document View Transitions. Andere Browser navigieren weiterhin normal.
- Native Scrollsteuerung mit weichen, gezielten Ankersprüngen. Ladehinweise erscheinen erst bei tatsächlicher Wartezeit; Video- und Bildfehler haben einen definierten Zustand.
- Medienlogik in `src/media.js`, Bewegungen in `src/motion.js`, Interaktionsgestaltung in `src/experience.css`.

Auf ausdrücklichen Wunsch gibt es keine automatische Reduced-Motion-, No-Motion- oder Save-Data-Abschaltung. Lesbare Inhalte ohne JavaScript und manuelle Videosteuerungen bleiben erhalten. Die Bewegung erfordert keine externe Animationsbibliothek.

Technische Referenzen: [MDN: Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [MDN: @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition).

## Responsive Fassung

Die Gestaltung berücksichtigt kleine Smartphones, Zwischenbreiten, Tablets, Querformat und große Desktopansichten. Enge Inhaltsgruppen werden rechtzeitig gestapelt: Leistungsformate und Webpakete bis 720px, der Kontaktbereich bis 900px. Das Projektselect nutzt immer die gesamte verfügbare Formularbreite. Lange Titel und Linktexte können umbrechen.

Das Mobilmenü besitzt einen eigenen Scrollbereich, dessen Höhe sich an den sichtbaren Bildschirm und die gemessene Headerhöhe anpasst. Beim Wechsel zwischen Mobil- und Desktopnavigation werden Animationen, Zustand und Fokus zurückgesetzt. Eigenständige mobile Navigations- und Kontaktlinks haben mindestens 44px Trefferhöhe. Auf der Kontaktseite führt die Navigation direkt zum Formular.

Längere Entwürfe zeigen den Text in einem per Tastatur und Touch erreichbaren Scrollbereich. Die Entwurfsüberschrift wird beim Vorbereiten sichtbar unter dem Header positioniert. Notch-Abstände werden über CSS-Umgebungsvariablen berücksichtigt; die Grundlage beschreibt [MDN zu sicheren Bildschirmrändern](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env). Die Größenprüfung ersetzt keine Prüfung auf jeder existierenden Kombination aus Gerät und Browser; die konkret durchgeführten Prüfungen stehen in PRUEFUNG.md.


## Vercel und Indexierung

Die Website ist als statische Vercel-Site konfiguriert. `vercel.json` setzt Build, Ausgabeordner `dist`, abschließende Slashes und die bisherigen Kurzpfad-Weiterleitungen. Die originalen Medien in `dist/assets` und `dist/media` sind versionierte Quelldateien; `dist` vor dem Build nicht löschen.

Die öffentliche Fassung ist vorerst **nicht zur Suchmaschinenindexierung freigegeben**: `indexable: false` erzeugt `noindex, nofollow` in jeder HTML-Seite. Zusätzlich liefert Vercel den Header `X-Robots-Tag: noindex, nofollow` für sämtliche Pfade. `robots.txt` erlaubt den Abruf dieser Anweisungen und bewirbt bis zur Freigabe keine Sitemap.

Für die spätere Indexierungsfreigabe `indexable` auf `true` setzen, den `X-Robots-Tag` aus `vercel.json` entfernen, neu bauen und veröffentlichen. `noindex` ist eine Suchmaschinenanweisung, keine Zugriffssperre.

Das GitHub-Repository ist https://github.com/kiliansmd/fpmc. Die lokale Vercel-Verknüpfung und Umgebungsdateien werden nicht versioniert.


## Social-Vorschau und Metadaten

Alle 19 Inhaltsseiten liefern vollständige Open-Graph- und X-Kartendaten bereits im statischen HTML. Individuelle Titel und Beschreibungen bleiben erhalten; das gemeinsame schwarze Markenmotiv `dist/og.png` ist 1738 × 905 Pixel groß. Bildtyp, tatsächliche Abmessungen, Alternativtext und absolute HTTPS-Adresse sind hinterlegt. Die Wortmarke ist für breite Vorschauen und mittige quadratische Ausschnitte gesetzt. Die konkrete Darstellung und das Caching bestimmen die jeweiligen Plattformen.

Canonicals, Open-Graph-URLs und Sitemap verwenden die Produktionsdomain. Strukturierte Daten verbinden Organization, WebSite und WebPage beziehungsweise passende Seitentypen; bestehende Services und Breadcrumbs bleiben erhalten. Seiten mit dem offiziellen Musikvideo enthalten dessen VideoObject. `npm run check` prüft alle 17 Social-Felder, deren Konsistenz und die echten PNG-Abmessungen. `noindex, nofollow` bleibt in HTML und HTTP-Header aktiv.

Technische Grundlagen: [Open Graph](https://ogp.me/), [Google: Website-Name](https://developers.google.com/search/docs/appearance/site-names), [Google: Organization-Daten](https://developers.google.com/search/docs/appearance/structured-data/organization).


## Aktuelle responsive Fassung

Die abschließend eingebundene `adaptive.css` stimmt die cinematische Gestaltung auf schmale Smartphones, Tablet-Zwischenstufen und breite Monitore ab. Die Navigation wechselt bis einschließlich 1024px ins Mobilmenü; CSS und JavaScript verwenden dieselbe Grenze. Die Headerhöhe folgt dem tatsächlichen Inhalt einschließlich Displayrändern. Kurze Querformatfenster erhalten kompaktere Einstiege und ein zweispaltiges, scrollbar bleibendes Menü.

Auf Tablets erscheinen die drei Produktionsbereiche als große Bild-/Textzeilen. Auf Smartphones stehen Filmbeschriftungen unter dem Bild, damit längere Texte und größere Schrift nicht abgeschnitten werden. Teamangaben und der Wechsel zum nächsten Projekt besitzen ein eindeutiges Raster. Das Film-BTS bleibt im Inhaltsbereich ausgerichtet; DOM- und visuelle Reihenfolge stimmen überein. Touchgeräte erhalten auch bei großer Breite ausreichend hohe Footerlinks. Formulare verwenden skalierbare Eingabeschrift.

Die schwarzen Flächen, serifenlosen Schriften, vorhandenen Medien, Animationen, Anti-Overscroll-Regeln und Social-Metadaten bleiben erhalten.


## Mobile Feinabstimmung nach iPhone-Rückmeldung

Unicode-Pfeile wurden vollständig durch einheitliche SVG-Icons ersetzt. Das betrifft Hauptaktionen, Footer, Tags, externe Links, Player und Menü. Icons sind für Screenreader ausgeblendet und nicht fokussierbar; die Bedienelemente behalten ihre Textbeschriftungen. Die Prüfung verhindert neue Emoji-Glyphen und nicht grafische Pfeile im ausgelieferten HTML.

Die mobile Leistungsübersicht verwendet eine kürzere Einleitung und eine Hauptaktion. Danach folgen direkt die echten Produktionsbilder, jeweils vor den zugehörigen Kartentexten. Addierte Abschnittsabstände sind bereinigt; zwischen Aktion und erstem Bild verbleiben bei 393px Fensterbreite 40px. Auch Projektbeschriftungen, Teamliste sowie die mobilen Musikvideo-/Audio-Einstiege sind kompakter abgestimmt.

## Feine Filmkörnung

Die gesamte Website erhält eine zurückhaltende monochrome Textur über `body::after`. Die lokale, nahtlos wiederholte `grain.svg` ist 420 Bytes groß und wird aus `src/` in die öffentlichen Assets kopiert. Die Deckkraft beträgt 9%, auf Smartphones bis 600px 7,5%. Der fixierte Layer liegt über Bildern, Film und Navigation, nimmt keine Zeigerereignisse entgegen und erzeugt keinen Inhalt für Screenreader. Er benötigt weder JavaScript noch eine fortlaufende Animation oder einen bildschirmfüllenden SVG-Filter. Im Druck wird die rein dekorative Textur ausgeblendet.
