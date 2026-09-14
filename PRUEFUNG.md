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
