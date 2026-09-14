# Prüfung der lokalen Website

Stand: 14.09.2026. Historische Funktionsprüfungen mit Ergänzung zur aktuellen Gestaltungs- und Anfrageverfeinerung am Ende. Geprüfte Vorschau: http://localhost:4179

## Aktuelles Ergebnis

Die vollständige Website ist lokal benutzbar. Der statische Inhalts-, Link- und Metadatencheck ist bestanden. Die Gestaltung wurde auf Desktop, Tablet und Smartphone kontrolliert.

| Bereich | Prüfung und Ergebnis |
|---|---|
| Seitenstruktur | 19 eigenständige Inhaltsseiten mit jeweils einem H1, individuellen Titeln und Beschreibungen sowie Canonical. |
| Interne Verknüpfungen | 428 interne Linkverweise einschließlich Sprungmarken und 112 Medienverweise erfolgreich geprüft. |
| Strukturierte Daten | Alle 19 JSON-LD-Blöcke syntaktisch gültig; Unternehmensdaten, Breadcrumbs, Leistungen und Musikvideo vorhanden. |
| Desktop | Alle 19 Seiten bei 1707 CSS-Pixeln Breite auf horizontalen Überlauf kontrolliert: keiner. Visuelle Kontrolle unter anderem von Startseite, Leistungen, Archiv, Label und Kontakt. |
| Smartphone | Alle 19 Seiten bei 320 CSS-Pixeln Breite auf horizontalen Überlauf kontrolliert: keiner. Neue Kontaktkomposition anschließend erneut kontrolliert. |
| Tablet | Zwölf repräsentative Seiten bei 1024 CSS-Pixeln Breite kontrolliert: kein horizontaler Überlauf. Kontakt nach dem letzten Layoutumbau erneut geprüft. |
| Navigation | Mobiles Menü öffnet und schließt; Escape schließt und setzt den Fokus zurück. Nach dem Umbau erneut bei 320 Pixeln geprüft. |
| Projektfilter | Sichtbare Web-Auswahl mit fünf Projekten erneut geprüft. Filterlogik unverändert; vorheriger vollständiger Durchlauf: Alle 6, Film & Musik 1, Web & Digital 5. |
| Kontakt | Gültige Testangaben erzeugen im neuen Layout einen sichtbaren Entwurf mit korrekt kodiertem mailto-Link. Website und Professional werden aus der URL übernommen. Wechsel zu Film entfernt das unpassende Angebot und verbirgt den vorherigen Entwurf. Native E-Mail-Validierung ebenfalls beobachtet. |
| Lokales Bewegtbild | Originales BTS-Video auf Studio- und Startseite startet stumm. Abspielen und Pausieren im Browser geprüft. Die Sichtbarkeit wird im Code berücksichtigt. Die Abschaltungen für reduzierte Bewegung und Datensparmodus wurden in der nachfolgenden Motion-Fassung entfernt. |
| Schriften | Neue Schriftdateien lokal vorhanden; Latin und Latin Extended eingebunden. Original-Lizenztexte werden mitgeliefert. |
| Browsermeldungen | Bei der abschließenden Kontrolle keine eigenen Warnungen oder Fehler in den verfügbaren Browserlogs. |

## Weiterhin gültige Funktionsprüfungen

Diese Funktionen blieben im gestalterischen Umbau erhalten und wurden bereits an der vorherigen lokalen Fassung geprüft:

- Alle 19 Inhaltsseiten liefern per HTTP Status 200 und HTML. robots.txt wird als text/plain und die Sitemap als application/xml ausgeliefert.
- /arbeit führt mit 301 auf /projekte/, /connect auf /kontakt/, /v0 und /v1 auf /. Unbekannte URLs liefern die eigene Fehlerseite mit HTTP 404.
- Medien-Range-Requests liefern Status 206 mit korrekter Bytezahl.
- FAQ-Antworten sind über native Details-/Summary-Elemente aufklappbar.
- Der YouTube-Player wird erst durch einen ausdrücklichen Klick eingebunden. Der youtube-nocookie-Player trägt einen Titel; ein direkter YouTube-Link bleibt als Alternative vorhanden.
- Pflichtfelder verhindern unvollständige Anfragen. Nach Änderungen an Formulareingaben werden alte Entwürfe und Kopierstatus zurückgesetzt.

## Grenzen der Prüfung

Es wurde keine Testnachricht versendet. Die Website hat keinen Formularserver; die finale Übermittlung erfolgt bewusst im E-Mail-Programm. Die Kopierfunktion ist implementiert und im Code kontrolliert, wurde aber nicht auf Kosten der vorhandenen Systemzwischenablage getestet.

Die Wiedergabe im externen YouTube-Player ließ sich in dieser Browserumgebung nicht vollständig bestätigen; geprüft wurde das korrekte bedarfsgesteuerte Einbinden. Die Originalveröffentlichung und der direkte Alternativlink sind vorhanden. Das lokale BTS-Video wurde dagegen tatsächlich abgespielt und pausiert.

Dies ist keine Lighthouse-, Core-Web-Vitals-, Suchranking-, Barrierefreiheitszertifizierung oder rechtliche Prüfung. Die Überprüfung ohne JavaScript erfolgte anhand der statischen Ausgabe und des vorgesehenen Fallbacks, nicht als separater Browserlauf. Für eine Veröffentlichung gelten die Hinweise in README.md, insbesondere zu Hosting, rechtlichen Angaben und verbindlichen Preisen.

Die normale Desktopansicht wurde vor der Übergabe wiederhergestellt. Die ursprüngliche Prüfung betraf die lokale Art-Direction-Fassung.

## Motion-Fassung und Veröffentlichungsvorbereitung

- Statischer Check: 19 Seiten mit individuellen Titeln/Beschreibungen, 428 internen Linkverweisen, 131 Medienverweisen und 19 gültigen JSON-LD-Blöcken.
- CSS- und JavaScript-Regeln für Reduced Motion sowie die Save-Data-Abschaltung entfernt. Funktionsfallbacks ohne JavaScript sind erhalten.
- Projektfilter im Browser erneut geprüft: Web 5, Film 1, Alle 6. Die Karten werden animiert umgeordnet.
- FAQ geöffnet und geschlossen; der Endzustand entspricht dem nativen `open`-Attribut, die temporäre Höhenanimation wird entfernt.
- Menüanimation und Escape bei 320 CSS-Pixeln geprüft. Navigation ist während des Schließens vorübergehend inert; der Fokus kehrt zum Menübutton zurück.
- Die neue Schriftmaske wurde nach einer Sichtkontrolle korrigiert, sodass das C der Wortmarke vollständig sichtbar bleibt. Parallax-Verschiebungen sind auf den tatsächlichen Bildüberstand begrenzt.
- Canonicals, Sitemap, strukturierte Daten und vorhandenes Social-Bild sind an die Veröffentlichungsadresse angepasst. Lokale Datenschutzformulierung ersetzt; Redirect-Datei für die statische Veröffentlichung ergänzt.
- Browsermeldungen bei den geprüften neuen Abläufen ohne Website-Fehler. Native Seitenübergänge hängen von der Browserunterstützung ab.

- Alle 19 Routen der Motion-Fassung erneut bei 320 CSS-Pixeln geprüft: kein horizontaler Seitenüberlauf. Anschließend Desktopansicht wiederhergestellt.

## Verfeinerung von Gestaltung und Anfrageführung

- Alle 19 Seiten bei 320 und 1707 CSS-Pixeln Breite erneut geprüft: kein horizontaler Seitenüberlauf, genau ein H1 pro Seite, keine defekten Bilder im mobilen Durchlauf.
- Acht repräsentative Seiten bei 1024 CSS-Pixeln Breite kontrolliert: kein Überlauf.
- Visuelle Kontrolle der neuen Startseite auf Desktop und Smartphone sowie von Kontakt und Filmproduktion.
- Neuer mobiler Anfragebutton führt direkt zum Kontaktformular. Der Film-Anfragelink übernimmt „Film“ als Projektart.
- Vereinfachtes Formular mit Name und Projektidee, ohne E-Mail-Angabe erfolgreich geprüft. Website und Professional werden aus der URL übernommen und korrekt in den Entwurf geschrieben.
- Optionale abweichende Antwortadresse: ungültige Eingabe bei eingeklapptem Bereich öffnet diesen und setzt den Fokus ins Feld. Nach Korrektur ist die Antwortadresse im Entwurf enthalten.
- Die Erklärung vor der Eingabe und der Entwurf benennen den tatsächlichen Ablauf: Nachricht vorbereiten, prüfen, im eigenen E-Mail-Programm senden. Keine Testnachricht versendet.
- Statischer Check der verfeinerten Ausgabe: 19 Seiten, 19 individuelle Titel und Beschreibungen, 447 interne Linkverweise, 131 Medienverweise, 19 gültige JSON-LD-Blöcke.
- Keine zusätzliche externe Animationsbibliothek, kein Tracking und kein Formularbackend ergänzt. Keine Conversion-Messung oder A/B-Prüfung durchgeführt.
- Labelseite: Text- und Outline-Hoverfarben sowie primäre Buttons für den dunklen Bereich korrigiert; dunkle Fokusringe auf der hellen Navigation, Abschluss-CTA und im Footer. Helle CTA im Browser visuell und anhand der berechneten Farben kontrolliert.
- Browserlogs: Beim schnellen automatisierten Wechsel zwischen Seiten meldete der Browser einmal „AbortError: Transition was skipped“. Die Navigation und Zielseite funktionierten. Keine weiteren Website-Warnungen oder -Fehler im kontrollierten Log.

## Responsive Überarbeitung

- 323 lokale Seiten-/Größenprüfungen über alle 19 Inhaltsseiten, mit beobachteten Breiten zwischen 320 und 1920 CSS-Pixeln. Keine seitlichen Überläufe oder abgeschnittenen Überschriften/Buttons in diesem Durchlauf. Die Viewport-Umschaltung des eingebetteten Browsers lieferte während einzelner Wechsel Zwischenbreiten; die tatsächlichen DOM-Breiten wurden gemessen.
- Gezielte Kontrolle der schmalen Tabletansicht bei 640px: Webpakete einspaltig, alle Paketlinks erhalten.
- Mobiles Menü bei 568×320: Unterkante innerhalb des Viewports, eigener Scrollbereich; Escape setzt Fokus auf den Menübutton. Wechsel zu 1200px und zurück schließt das Menü und überträgt den Fokus auf das jeweils sichtbare Bedienelement.
- Anfrage bei rund 390px mit langem Nachrichtentext erstellt: Entwurfsüberschrift ca.20px unter dem Header, korrekter Fokus, kein horizontaler Überlauf. Die kontrollierten eigenständigen Kontakt-, Footer-, Menü- und Entwurfsaktionen haben mindestens 44px Höhe.
- Kontakt-Schnelllink auf derselben Seite springt zu #anfrage, ohne Formulareingaben neu zu laden.
- Vier temporäre lokale Prüfansichten mit 200% CSS-Grundschrift: Startseite, Kontakt, Web/Digital und Label. Nach Korrekturen auch bei 320px keine abgeschnittenen Überschriften oder Buttons. Der Webbereich zeigte bei dieser Extremprüfung eine Rundungsdifferenz von 1px in der dokumentweiten Messung. Die Prüfansichten wurden vor dem Veröffentlichungsbuild entfernt.
- Source-Review der Menülogik: keine festgestellte Race Condition beim schnellen Umschalten oder bei Breakpointwechseln. Geänderte Syntax und statische Website-Verknüpfungen werden vor Veröffentlichung erneut geprüft.
- Die Geräteprüfungen verwenden den eingebetteten Browser mit angepassten Viewports. Keine separate Safari-, Firefox- oder physische iOS-/Android-Geräteprüfung; die Grundschriftprüfung ist eine lokale CSS-Prüfansicht, kein Betriebssystem-Schriftgrößentest.
- Mobile Projektfilter abschließend geprüft: Web/Digital 5, Alle 6. Tab aus dem geöffneten Menü führt zum ersten sichtbaren Inhalts-Steuerelement, schließt das Menü und entfernt die Scrollsperre. Keine Warnungen oder Fehler im abschließenden Browserlog.
- Finaler Build und Syntaxcheck bestanden; statischer Check weiterhin 19 Seiten, 447 interne Linkverweise, 131 Medienverweise und 19 gültige JSON-LD-Blöcke.


## Kräftige Sans-Serif-Gestaltung

- Alle 19 Inhaltsseiten mit Space Grotesk, Schwarz/Weiß/Kobaltblau, größeren Bedienelementen und abgestimmten Abständen überarbeitet. Keine Serifenschrift oder synthetische Kursivschrift im kontrollierten Text; keine dekorativen Eyebrow-Elemente mehr im HTML. Sachliche Angaben wie Release-Datum, Preise, Teamrollen und Formularhinweise bleiben erhalten.
- 133 lokale Seiten-/Breitenprüfungen: alle 19 Seiten bei gemessenen 320, 391, 640, 851, 1024, 1280 und 1727 CSS-Pixeln. Kein horizontaler Seitenüberlauf, keine abgeschnittenen kontrollierten Überschriften/Buttons/Footerlinks, keine defekten Bilder, jeweils ein H1.
- Nach den letzten Schriftkorrekturen alle 19 Seiten erneut bei 320 und 1727 CSS-Pixeln geprüft: kein Überlauf, keine abgeschnittenen Überschriften/Buttons und keine verbliebenen Serif-/Kursivstile in den kontrollierten Überschriften und Absätzen.
- Visuelle Kontrolle von Startseite, Leistungsübersicht, Audio und Abschluss-CTA auf Desktop sowie Startseite im Smartphoneformat. Die technische Breitenprüfung nutzt den eingebetteten Browser; keine separate Prüfung auf physischen Geräten oder in anderen Browser-Engines.
- Kontraste: Standard-Fließtext auf Papierweiß ca. 6,81:1, Kobaltblau auf Papierweiß ca. 6,20:1. Den Introtext des dunklen Audio-Einstiegs auf helles Grau korrigiert; Fokusringe für Audio-Einstieg, Studioabschnitt und blauen Abschlussbereich angepasst.
- Mobiles Menü bei 391 CSS-Pixeln geöffnet und per Escape geschlossen. Film-Anfrage mit Testname und Projektidee erfolgreich vorbereitet: Projektart übernommen, Entwurf sichtbar, Fokus auf Entwurfsüberschrift, korrektes mailto-Ziel, kein Überlauf. Entwurfsüberschrift liegt rund 20px unter dem Header. Keine Nachricht versendet.
- Finaler statischer Check: 19 Seiten, 19 individuelle Titel/Beschreibungen, 447 interne Linkverweise, 131 Medienverweise und 19 gültige JSON-LD-Blöcke.


## Schwarze Gestaltung und Satoshi

- Auf allen 19 Seiten überwiegend schwarze Flächen (#08090a), dunkle Graphitbereiche (#111214), gebrochenes Weiß und dezente helle Interaktionsakzente. Header, mobiles Menü, Footer, Audio, Label, Formular und Entwurf gesondert an die dunkle Palette angepasst. `color-scheme: dark` und dunkle Browser-Themenfarbe gesetzt.
- Satoshi Variable wird als unveränderte WOFF2-Datei aus dem offiziellen Fontshare-Paket lokal eingebunden und vorab geladen. Hauptschrift mit Gewichten von 300 bis 900, kräftige Überschriften und feinere Fließtexte. Space Grotesk bleibt für die FPMC-Wortmarke. Lizenztext ITF FFL 2.0 vom 17.08.2026 und Herkunftsnachweis mit SHA-256 gespeichert.
- Alle 19 Seiten bei 1727px auf Überlauf, abgeschnittene Überschriften/Buttons, ungewollt helle Bereiche und berechnete Textkontraste geprüft: keine festgestellten Fehler. Die Kontrastprüfung berücksichtigt solide Hintergrundflächen; Bildüberlagerungen waren aus dieser automatisierten Berechnung ausgeschlossen.
- Weitere 76 lokale Größenprüfungen: alle 19 Seiten bei gemessenen 320, 391, 640 und 1024 CSS-Pixeln. Keine horizontalen Überläufe, abgeschnittenen kontrollierten Überschriften/Buttons/Footerlinks oder defekten Bilder.
- Visuelle Kontrolle der schwarzen Startseite und Kontaktansicht. Kontakt bei 320px: schwarzes Mobilmenü, lesbare helle Primäraktion, Escape, dunkler Feldfokus mit hellem Fokusring und korrekt erstellter E-Mail-Entwurf geprüft. Entwurf sichtbar, Fokus auf Überschrift, kein Überlauf; keine Nachricht versendet.
- Die bestehenden Inhalte, SEO-Metadaten, Animationen und Funktionen bleiben erhalten. Die Prüfung erfolgte im eingebetteten Browser; keine separate Safari-/Firefox- oder physische Geräteprüfung.


## Redaktionelle und bildgeführte Überarbeitung

- Vollständige Inhalts- und Gestaltungsprüfung der 19 Routen. Größere Filmfläche auf der Startseite, neue Leistungszeilen, drei bildgeführte Leistungs-Einstiege, differenziertes Archiv, ruhigere FAQ- und Kontaktkomposition sowie kürzere Texte umgesetzt. Schwarze Palette, Satoshi-Schrift und vorhandene Inhalte/Funktionen bleiben erhalten.
- 114 lokale Seiten-/Größenprüfungen: alle 19 Seiten bei 320, 391, 640, 851, 1024 und 1727 CSS-Pixeln. Keine seitlichen Überläufe, abgeschnittenen kontrollierten Überschriften/Buttons/Footerlinks, defekten Bilder oder sichtbaren Eyebrows; jeweils genau ein H1. Eine Browser-Auswertung hatte einen Timeout und wurde erfolgreich wiederholt.
- Visuelle Kontrolle der neuen Startseite, Film- und Musikvideo-Einstiege sowie der Ausgangslage im Projektarchiv und der mobilen Leistungsübersicht. Bildausschnitte nutzen ausschließlich vorhandenes FPMC-Material.
- Projektfilter nach Layoutänderung erneut geprüft: Web/Digital 5, Film/Musik 1, Alle 6. Keine seitlichen Überläufe im geprüften Filterzustand.
- Film-FAQ geöffnet; neue zweispaltige Desktopkomposition und nativer Open-Zustand bestätigt.
- Bei 320px vom Film-Anfragelink ins Formular navigiert: „Film“ übernommen, Menü/Escape geprüft, Testentwurf erzeugt, Fokus auf Entwurfsüberschrift, rund 20px Abstand zum Header, korrektes mailto-Ziel und kein horizontaler Überlauf. Keine Nachricht versendet.
- Webprojekt-CTA übernimmt „Website“; Paketlink übernimmt Website/Professional. Generischer Zwischenabschnitt auf den fünf Webprojektseiten entfernt; Fakten verweisen auf Web/Digital.
- Statischer Check bestanden: 19 Seiten, 19 individuelle Titel/Beschreibungen, 442 interne Linkverweise, 131 Medienverweise, 19 gültige JSON-LD-Blöcke. Keine Aussage über gemessene Conversion-, Ranking- oder Ladezeitverbesserungen.

- Abschließend berechnete Textkontraste auf soliden Hintergrundflächen aller 19 Seiten geprüft: keine Unterschreitung der angesetzten 4,5:1 für normalen beziehungsweise 3:1 für großen Text. Bildüberlagerungen sind aus dieser Berechnung ausgenommen.


## Scrollen, Ladezustände und Interaktionen

- Eine zentrale Bewegungsebene ersetzt verschachtelte Titel-/Introanimationen. Lange Bildvorhänge entfallen zugunsten kurzer Einblendungen. Bereits gelesene Inhalte werden bei verzögert eintreffendem JavaScript nicht nachträglich ausgeblendet.
- Normales Scrollen und die Wiederherstellung der Scrollposition bleiben beim Browser. Bewusste Ankersprünge und der Kontaktentwurf scrollen weich mit 24px Abstand zum gemessenen Header. Der Entwurf animiert nur seine Deckkraft, damit seine Zielposition nicht nachträglich verrutscht.
- Scrollabhängige Bildbewegung und Zeigerreaktion lesen Geometrie gebündelt und schreiben sie anschließend einmal pro angefordertem Frame. Arbeit am unsichtbaren Lesefortschritt entfernt. Kein dauerhaft laufender JavaScript-Animationsloop.
- Native Seitenüberblendung auf 180/240ms gekürzt; die Navigation bleibt an ihrer Position. Eine schmale unbestimmte Ladeanzeige erscheint nur, wenn ein tatsächlicher Seitenwechsel länger als 180ms dauert. Keine künstliche Wartezeit und keine erfundenen Prozentwerte.
- Bilder behalten ihre Abmessungen und werden nach erfolgreichem Laden/Decodieren eingeblendet. Langsame Bilder erhalten einen verzögerten Ladezustand, fehlerhafte gerahmte Bilder einen verständlichen Ersatzhinweis.
- YouTube behält das Vorschaubild während des Ladens. Fehler und ein 15s-Timeout erlauben einen erneuten Versuch; der bestehende direkte YouTube-Link bleibt verfügbar. Der Zustand „ready“ bezeichnet das geladene iframe-Dokument, nicht eine garantierte Wiedergabebereitschaft des externen Anbieters.
- Lokales Video unterscheidet tatsächliche Wiedergabe, Pufferung, Pause und Fehler. Die neueste Sichtbarkeitsmeldung entscheidet über automatisches Starten/Pausieren; manuelle Pause bleibt erhalten. Wiedergabeabbrüche mit schnellem Neustart und die Rückkehr aus dem Hintergrund berücksichtigt.
- FAQ, Zusatzangaben und Filter verarbeiten schnelle Richtungswechsel. Ungültige Zusatzangaben bleiben nach dem Öffnen zur Korrektur sichtbar. Tasten, Links und Projektflächen geben auch beim Tippen Rückmeldung.
- 57 Browserprüfungen: alle 19 Seiten bei 320, 768 und 1440 CSS-Pixeln, ohne festgestellten horizontalen Überlauf oder abweichende H1-Anzahl. Keine gemeldeten Bildfehler im jeweils erfassten Zustand. Noch nicht sichtbare Lazy-Loading-Bilder müssen dabei nicht bereits geladen sein.
- Bedienprüfung: lokale Video-Wiedergabe/Pause, Anker zur Leistungsübersicht, schnelle FAQ-Wechsel, Web/Film/Alle-Filter, mobiles Menü und Escape, Kontaktanker, Zusatzangaben, Validierungsfokus und Entwurf. Bei 320px lag die Entwurfsüberschrift nach Abschluss 24px unter dem Header. Keine Anfrage versendet.
- YouTube-Fassade wurde im Browser aktiviert; die iframe-Anzeige erreichte „ready“ bei gleichbleibenden Rahmenabmessungen. Externe Wiedergabe hängt weiterhin vom Anbieter und der Verbindung ab.
- 26 gezielte Node-VM-Ereignisprüfungen bestanden: 17 Lade-/Fehler-/Retry-Fälle, sechs Offen-/Zu-/Validierungsfälle sowie drei Sichtbarkeits-/Pufferungsfälle. Langsame und fehlgeschlagene Medienereignisse wurden kontrolliert simuliert; keine Aussage über gemessene reale Netzwerklatenzen.
- Build, JavaScript-Syntax, Diff und statischer Check bestanden: 19 individuelle Titel/Beschreibungen, 442 lokale Linkverweise, 150 Asset-Verweise einschließlich der zusätzlichen lokalen Mediendatei und 19 gültige JSON-LD-Blöcke.
- Prüfung im eingebetteten Browser; keine separate Messung auf physischen Geräten oder in Safari/Firefox. Native View Transitions können bei unterbrochenen Navigationen vom Browser übersprungen werden; die Links bleiben normale Dokumentnavigationen.

Technische Grundlagen: [MDN: scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior), [MDN: scrollRestoration](https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration), [Chrome: Cross-document View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document).


## Overscroll- und Bounce-Schutz

`overscroll-behavior: none` gilt für HTML/Body sowie die eigenständigen Scrollbereiche Mobilmenü, Entwurf und Textfeld. Die bisherigen `contain`-Werte werden durch die zuletzt eingebundene Interaktionsgestaltung überschrieben. Der Dokumenthintergrund bleibt schwarz. Normales Scrollen, Zoom und Ankersprünge verwenden weiterhin die Browserfunktionen. Build und statische Prüfung der 19 Seiten bestanden. Die Wirkung des systemseitigen Bounce-Effekts hängt von der CSS-Unterstützung des jeweiligen Browsers ab; keine separate Prüfung alter Browser oder externer iframe-Inhalte. Grundlage: [MDN: overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior).


## Vercel-Veröffentlichung ohne Indexierung

- Statische Vercel-Konfiguration: `npm run build && npm run check`, Ausgabe `dist`, native Verzeichnisrouten, Slash-Normalisierung, Weiterleitungen aus den bisherigen Kurzpfaden.
- Gemeinsame Origin-Auflösung für Build und Check; stabile Vercel-Produktionsdomain für Canonicals, Open Graph und strukturierte Daten. Lokaler Fallback: https://fpmc-tau.vercel.app.
- Alle 19 Seiten und die 404-Seite erhalten `noindex, nofollow`. Zusätzlich catch-all `X-Robots-Tag` auf Vercel. Statischer Check prüft Meta-Tags, Headerkonfiguration und die erlaubte Abrufbarkeit der Seiten in robots.txt.
- Hostingabschnitt in der Datenschutzerklärung auf Vercel und dessen Datenschutzhinweise aktualisiert.
- Die ursprüngliche Domain www.fpmc.house und die bisherige Sites-Veröffentlichung werden durch diese Vercel-Konfiguration nicht umgestellt.
- Grundlagen: [Google: Indexierung blockieren](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Vercel: Konfiguration](https://vercel.com/docs/project-configuration/vercel-json), [Vercel: Systemvariablen](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_project_production_url), [Vercel: Datenschutz](https://vercel.com/legal/privacy-notice).


## Neue Art Direction – 14.09.2026

- Alle 19 Inhaltsseiten in einem isolierten Chromium-Browser bei 320, 390, 720, 900, 1024 und 1440 CSS-Pixeln geprüft (114 Seiten-/Breitenkombinationen): HTTP 200, genau ein H1, keine horizontalen Überläufe oder abgeschnittenen Titel/Bedienelemente, noindex und Anti-Overscroll erhalten.
- Ganzseitige Sichtprüfung der neuen Label-, Studio-, Archiv-, Leistungs- und Kontaktgestaltung auf Desktop und Smartphone. Der bildfüllende Einstieg und die mobile Ausblendung des Filmframes wurden separat kontrolliert.
- Kaskadenkonflikte bei Release-Titel, Archivversatz und Footer-Schriftzug korrigiert. Der Spotify-Link bleibt auch auf der Redstar-Projektseite direkt erreichbar.
- Mobilmenü mit Escape und Fokusrückgabe erneut geprüft. Alle drei Projektfilter zeigen 6, 1 beziehungsweise 5 passende Projekte. FAQ lässt sich öffnen und schließen.
- Anfrage mit URL-Vorbelegung Website/Professional erzeugt einen korrekten lokalen E-Mail-Entwurf. Änderung auf Film blendet den veralteten Entwurf aus. Keine Nachricht versendet.
- Originales BTS-Video spielt, pausiert und startet wieder. Der Video-Sprung auf der Labelseite landet unterhalb des festen Headers.
- Keine JavaScript-Laufzeitfehler in den Browserdurchläufen. Statischer Check: 19 Seiten, 439 interne Linkverweise, 149 Medienverweise und 19 gültige JSON-LD-Blöcke.
- Schriften bleiben lokal und serifenlos. Es wurden keine zusätzlichen Medien, Referenzen oder Erfolgszahlen erfunden. Die Prüfung simuliert Bildschirmgrößen; sie ist kein Test jedes physischen Geräts.


## Cinematische Fassung – 14.09.2026

- Alle 19 Inhaltsseiten bei 320, 390, 720, 900, 1024 und 1440 CSS-Pixeln im Browser geprüft (114 Kombinationen): keine horizontalen Überläufe, keine abgeschnittenen Überschriften/Bedienelemente, genau ein H1 und noindex erhalten.
- Visuelle Kontrolle der Startseite und der Film-, Musikvideo-, Audio-, Studio-, Label-, Archiv-, Leistungs- und Kontaktgestaltung auf Desktop und Smartphone.
- Bühnenlicht-Loop spielt stumm, lässt sich manuell pausieren und fortsetzen und pausiert außerhalb des sichtbaren Bereichs. Ein passendes echtes Videostandbild hält den Einstieg vor der Wiedergabe stabil.
- Der offizielle YouTube-Player wird auf der Startseite erst nach Klick eingebunden. URL und Titel stimmen; eine vollständige externe Videowiedergabe wurde nicht als eigener Nachweis verlangt oder behauptet.
- Mobilmenü inklusive Escape/Fokus, Projektfilter (6/1/5), FAQ, Anfragevorbelegung, Entwurf und Zurücksetzen sowie BTS-Pause/Abspielen und Video-Sprung erneut bestanden. Keine Nachricht versendet und keine Zwischenablage überschrieben.
- Keine JavaScript-Laufzeitfehler im Browserlauf. Statischer Check: 19 Seiten, 440 interne Linkverweise, 153 Asset-Verweise und 19 gültige JSON-LD-Blöcke.
- Anti-Overscroll und manuelle Videosteuerung bleiben erhalten. Die Website lädt keine Serifenschriften und keine neuen Animationsbibliotheken.


## Social-Vorschau und Metadaten – 14.09.2026

- Ein gemeinsames cinematisches Markenmotiv, 1738 × 905 Pixel PNG, unverändert aus dem integrierten ImageGen-Werkzeug übernommen. Textinhalt und Gestaltung visuell geprüft.
- Vorschauprüfung im isolierten Chromium-Browser: breite 620px-Karte, kompakte 340px-Karte, mittiger 260 × 260px-Zuschnitt sowie 110 × 110px-Miniatur. Die zentrale Wortmarke bleibt in allen vier Layouts erhalten. Dies sind Layoutprüfungen, keine tatsächlichen Veröffentlichungen auf Social-Plattformen.
- Alle 19 Seiten: individuelle Titel/Beschreibungen, 17 vollständige und eindeutige Social-Metafelder, passende Canonical-/OG-URLs, absolute HTTPS-Bildadressen, korrekter PNG-Typ, tatsächliche Bildabmessungen und Alternativtext geprüft.
- WebSite auf der Startseite sowie passende WebPage-Typen und Organization-Logo verknüpft. Vorhandene Service- und Breadcrumb-Daten erhalten. Auf Startseite, Labelseite und Redstar-Projektseite stimmt die VideoObject-Zuordnung mit dem tatsächlichen Videoplayer überein.
- Build und statischer Check bestanden: 19 Seiten, 19 individuelle Titel/Beschreibungen, 440 interne Linkverweise, 153 Asset-Verweise, 19 gültige JSON-LD-Blöcke und 19 vollständige Social-Karten. JavaScript-Syntax und Diffprüfung bestanden.
- noindex-Metatags und Vercel-Header erhalten. Keine Änderungen an Layout, Scrollverhalten oder Formularfunktionen in diesem Schritt.


## Responsive Überarbeitung – 14.09.2026

- Ausgangslage auf allen 19 Seiten in zehn Formaten geprüft: 320 × 568, 390 × 844, 600 × 900, 768 × 1024, 850 × 650, 900 × 600, 1024 × 768, 1440 × 900, 2560 × 1440 sowie 844 × 390 CSS-Pixel. Konkrete schmale Teamspalten gefunden und korrigiert.
- Nach der Überarbeitung 190 Seiten-/Formatprüfungen bestanden: kein horizontaler Seitenüberlauf und keine abgeschnittenen kontrollierten Titel, Absätze oder Bedienelemente. Repräsentative Start-, Label-, Leistungs-, Kontakt- und Studioansichten visuell kontrolliert.
- Zusätzlich alle 19 Seiten bei 320, 768 und 1440px in Chromium, Firefox und WebKit geprüft (171 Kombinationen). Keine festgestellten Überläufe oder JavaScript-Laufzeitfehler.
- In allen drei Engines: Mobilmenü, Escape/Fokusrückgabe, Wechsel ins Desktopmenü, kurze Querformatnavigation, Kontaktentwurf mit langer Projektbeschreibung, drei Projektfilter, FAQ und BTS-Videopause bestanden. Keine Nachricht versendet. Ein zunächst zu früh ausgeführter Testassert beim asynchronen Media-Query-Wechsel wurde durch Warten auf den tatsächlichen Menüzustand korrigiert.
- Ohne JavaScript bleiben Navigation und Kontaktwege erreichbar. WebKit im Mobil-/Touchmodus bei 390 × 844, 844 × 390 und 1024 × 768: Menü sichtbar, innerhalb des Fensters und kein horizontaler Überlauf.
- Vergrößerte Basisschrift (`html { font-size:200% }`) auf acht repräsentativen Seiten bei 320, 768 und 1440px geprüft. Zwei lange Produktionsbeschreibungen benötigten zusätzliche Wortumbrüche. Diese sind ergänzt und gezielt nachgeprüft. Der Test betrifft die CSS-Basisschrift; er bildet nicht sämtliche Betriebssystem-Zoommodi ab.
- Safe-Area-Abstände berücksichtigt; Film-CTA steht im DOM vor der Videosteuerung wie in der mobilen Ansicht. Die Website bleibt auf noindex, Social-Vorschau und Anti-Overscroll sind unverändert.
- Die Browserprüfungen simulieren Geräteformate und Eingabemodi. Sie ersetzen keine Tests auf jedem physischen Endgerät.


## Mobile Korrektur nach iPhone-Screenshot – 14.09.2026

- Screenshotursache nachvollzogen: Unicode-Pfeile können von iOS als farbige Emoji-Zeichen gerendert werden. Alle Pfeile im HTML und das Playzeichen durch eigene Inline-SVGs ersetzt; Menüsymbol ebenfalls SVG. Kein Symbolfont und keine neue Bibliothek. Icons verwenden currentColor, aria-hidden und focusable=false.
- WebKit im Mobilmodus, 393 × 700px: zuvor 132px addierter Abstand zwischen Hero-Aktionen und erster Leistung. Jetzt 40px bis zum ersten Produktionsbild; das Bild beginnt bei rund 361px. Einleitung gekürzt und redundanten Sprunglink auf die unmittelbar folgenden Leistungen entfernt. Header kompakter; die Kurzanfrage bleibt mindestens 44px hoch.
- Produktionsbilder stehen mobil vor den Kartentexten. Doppelte Bild-/Titelabstände normaler Projektkarten entfernt. Teamliste näher an den Studio-Einstieg gerückt. Musikvideo-/Audio-Einstiege auf mobilen Geräten mit kleineren Mindesthöhen und weniger oberem Leerraum.
- Statischer Check: 19 Seiten, 19 individuelle Titel/Beschreibungen, 439 interne Links, 153 Asset-Verweise, 19 JSON-LD-Blöcke und vollständige Social-Metadaten. Neue Prüfung auf Emoji-fähige UI-Zeichen und nicht grafische Pfeile. Copyrightzeichen bleibt normaler Text. Keine Emoji-Zeichen in CSS-content-Regeln gefunden.

- Alle 19 Seiten in Chromium, Firefox und WebKit bei 320, 768 und 1440px erneut geprüft: 171 Layoutkombinationen ohne festgestellte Überläufe oder JavaScript-Laufzeitfehler. Menü, Breakpointwechsel, Querformat, Kontaktentwurf, Filter, FAQ und Videopause bestanden. Weitere 30 Kontrollen mit vergrößerter Basisschrift, ohne JavaScript und im WebKit-Touchmodus bestanden. Kurze 667 × 375px-Fenster für Musikvideo und Audio gesondert nachgeprüft. Die Prüfung verwendet Browseremulation, keine physischen iPhones.

## Behind the scenes im Hero – 14.09.2026

- Originales BTS-Reel ersetzt den Bühnenlicht-Hintergrund auf der Startseite. Sichtbare Portraitfläche direkt neben dem Titel, auch mobil; nur ein lokaler Videoloop auf der Startseite. Teamabschnitt ohne Wiederholung des Clips neu gesetzt.
- 54 Layoutkontrollen in Chromium, Firefox und WebKit: Hero in 13 Formaten von 320 bis 2560px inklusive zwei kurzen Querformaten, jeweils drei Prüfungen mit 200% CSS-Basisschrift sowie Studio- und Filmproduktionsseite. Keine festgestellten Überläufe oder abgeschnittenen kontrollierten Texte. Ein auf 320px zunächst umbrechender Satzpunkt wurde mit containerabhängiger Schriftgröße korrigiert.
- In allen drei Engines startet der Hero-Clip ohne Scrollen oder Klick, stumm und mit playsinline. Sichtbarkeit, originales Seitenverhältnis, manueller Pausezustand beim Zurückscrollen, automatisches Pausieren außerhalb des Fensters und erneute Wiedergabe geprüft. Bestehende reguläre Videoregler auf Studio- und Filmproduktionsseite funktionieren weiterhin.
- Mobilmenü inklusive Escape, Sprung zum offiziellen Film unterhalb des Headers sowie weiterhin erst nach Klick eingebundener YouTube-Player geprüft. Keine JavaScript-Laufzeitfehler. Zusätzliche Sichtprüfung im WebKit-Mobil-/Touchmodus bei 320 und 393px sowie bei 768 und 1440px.
- Langsames Videoladen und Fehler vor Ausführung des Medien-Skripts simuliert. Standbild, SVG-Regler, aria-busy, Fehlerbeschriftung und erneutes Laden per Klick funktionieren. Für den eager Hero wird ein bereits vorhandener video.error-Zustand beim Initialisieren übernommen.
- Build, Syntax und statischer Check bestanden: 19 individuelle Titel/Beschreibungen, 439 interne Links, 153 Asset-Verweise, 19 JSON-LD-Blöcke und 19 vollständige Social-Karten. noindex, Social-Grafik, Anti-Overscroll und Emoji-freie SVG-Oberfläche bleiben erhalten. Geprüft mit Browseremulation, nicht mit jedem physischen Endgerät.

## Globale Filmkörnung – 14.09.2026

- Lokale monochrome SVG-Kachel über einen festen, nicht interaktiven CSS-Layer eingebunden. 420 Bytes; keine neue Bibliothek, JavaScript-Schleife oder fortlaufende Animation. Ursprüngliche Bild- und Videodateien bleiben unverändert.
- Desktop- und mobile Startseite visuell kontrolliert. Die geringere mobile Deckkraft erhält die Lesbarkeit kleiner Texte; dunkle Flächen zeigen eine feine Textur.
- 50 Seiten-/Breitenkontrollen bestanden: alle 19 Inhaltsseiten bei 393 und 1440px in Chromium, zusätzlich Startseite, Label und Kontakt in Firefox und WebKit bei beiden Breiten. Grain eingebunden, kein horizontaler Überlauf, noindex erhalten.
- In allen drei Engines bleiben Videopause/Fortsetzen, Mobilmenü, Navigation zur Labelseite, Footer-Kontaktlink und Kontaktentwurf bedienbar. Keine JavaScript-Laufzeitfehler; keine Nachricht versendet. WebKit zusätzlich mit Mobil-/Touchmodus und dreifacher Pixeldichte betrieben. Browseremulation, kein Test sämtlicher physischer Geräte.
- Build und statischer Check bestanden: 19 individuelle Titel/Beschreibungen, 439 interne Links, 153 HTML-Asset-Verweise, 19 JSON-LD-Blöcke und 19 vollständige Social-Karten. Der neue CSS-Assetverweis wurde durch die Browserprüfung zusätzlich kontrolliert.
