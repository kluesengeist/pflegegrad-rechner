# Pflegegrad-Rechner

Ein Rechner für das Begutachtungsinstrument der Pflegeversicherung (§ 15 SGB XI mit Anlagen 1 und 2) – als einzelne HTML-Datei, ohne Server, ohne Abhängigkeiten, ohne Datenübertragung. Er bildet die Punktelogik der Pflegebegutachtung für Erwachsene nach und kann zwischen dem **geltenden Recht** und dem **Entwurf des Pflegeneuordnungsgesetzes (PNOG)** umschalten, der zum 01.01.2027 in Kraft treten soll.

> **Kein Rechtsrat, keine amtliche Begutachtung.** Die Einstufung nimmt der Medizinische Dienst (MD) nach den Begutachtungs-Richtlinien vor. Dieser Rechner hilft, die Systematik zu verstehen, Szenarien zu vergleichen und ein Gutachten nachzurechnen – mehr nicht.

## Nutzung

**Online:** [kluesengeist.github.io/pflegegrad-rechner](https://kluesengeist.github.io/pflegegrad-rechner/)

Oder `index.html` herunterladen und im Browser öffnen. Das war's. Die Datei läuft auch von einem USB-Stick. Online wie lokal rechnet alles im Browser; nichts wird an einen Server gesendet. Gespeicherte Szenarien liegen im `localStorage` des Browsers und können als JSON exportiert und importiert werden.

## Funktionen

- Alle 78 Kriterien der acht Module mit den amtlichen Skalen (Anlage 1); Module 7 und 8 werden erhoben, aber – wie im Gesetz – nicht gewertet.
- Modul 5 mit Häufigkeitseingabe (pro Tag / Woche / Monat) und der Umrechnung in Punkte für die Teile 1 bis 4, einschließlich der Doppelgewichtung für zeit- und technikintensive Maßnahmen und zeitlich ausgedehnte Besuche.
- Zwei unabhängige Schalter: **Schwellenwerte** (geltend / PNOG-Entwurf) und **Anlage 2** (geltend / PNOG-Entwurf). Die Ergebnistabelle zeigt beide Rechtsstände immer nebeneinander.
- Hinweis zum Bestandsschutz (§ 142b SGB XI-E), wenn dieselbe Bewertung nach dem Entwurf einen niedrigeren Pflegegrad ergäbe.
- Je Kriterium die Anzeige, was eine Stufe mehr an Gesamtpunkten bringen würde („nächste Stufe: +10").
- Besondere Bedarfskonstellation (§ 15 Abs. 4 SGB XI).
- Szenarien speichern, laden, exportieren, importieren; Notizfeld; Druckansicht; Dunkelmodus.
- Selbsttests der Rechenlogik beim Laden (Ergebnis im Seitenfuß) und per `node test.js`.

## Rechtsstand

Stand des Rechners: Oktober 2026.

### Schwellenwerte (Gesamtpunkte)

| Pflegegrad | geltend (bis 31.12.2026) | PNOG-Kabinettsentwurf (ab 01.01.2027 geplant) |
|---|---|---|
| 1 | ab 12,5 | ab 15 |
| 2 | ab 27 | ab 30 |
| 3 | ab 47,5 | ab 50 |
| 4 | ab 70 | ab 70 |
| 5 | ab 90 | ab 90 |

### Anlage 2 – Umrechnung der Einzelpunkte in gewichtete Punkte

Geändert werden nach dem Kabinettsentwurf vom 30.09.2026 die Module 1, 4 und 6 (Rückkehr zu den Werten des Expertenbeirats von 2013); die Module 2, 3 und 5 bleiben unverändert.

| Modul | gewichtete Punkte | geltend | PNOG-Entwurf |
|---|---|---|---|
| 1 Mobilität (10 %) | 0 / 2,5 / 5 / 7,5 / 10 | 0–1 / 2–3 / 4–5 / 6–9 / 10–15 | 0–1 / 2–3 / **4–6** / **7–9** / 10–15 |
| 2 Kognition und Kommunikation (15 %)* | 0 / 3,75 / 7,5 / 11,25 / 15 | 0–1 / 2–5 / 6–10 / 11–16 / 17–33 | unverändert |
| 3 Verhaltensweisen und psychische Problemlagen (15 %)* | 0 / 3,75 / 7,5 / 11,25 / 15 | 0 / 1–2 / 3–4 / 5–6 / 7–65 | unverändert |
| 4 Selbstversorgung (40 %) | 0 / 10 / 20 / 30 / 40 | 0–2 / 3–7 / 8–18 / 19–36 / 37–54 | **0–3 / 4–9 / 10–24 / 25–39 / 40–54** |
| 5 Krankheits-/Therapieanforderungen (20 %) | 0 / 5 / 10 / 15 / 20 | 0 / 1 / 2–3 / 4–5 / 6–15 | unverändert |
| 6 Alltagsgestaltung und Kontakte (15 %) | 0 / 3,75 / 7,5 / 11,25 / 15 | 0 / 1–3 / 4–6 / 7–11 / 12–18 | **0–1 / 2–3** / 4–6 / 7–11 / 12–18 |

\* Von Modul 2 und 3 zählt nur der höhere gewichtete Wert.

**Wichtig:** Die geltende Anlage 2 ist dem Gesetzestext entnommen. Die Spalte „PNOG-Entwurf" ist aus veröffentlichten Auswertungen des Kabinettsentwurfs rekonstruiert (siehe Quellen) und sollte nach Veröffentlichung des Gesetzes im Bundesgesetzblatt mit der amtlichen Anlage 2 abgeglichen werden. Alle Rechtstabellen stehen gesammelt im Objekt `LEGAL` am Anfang des Script-Blocks `nba-core` in `index.html`; eine Korrektur ist dort mit wenigen Zeilen möglich. Die Selbsttests prüfen, dass die Bänder lückenlos bleiben.

### Modul 5

- **Teil 1 (5.1–5.7), Summe pro Tag:** unter 1 → 0 Punkte · 1 bis 3 → 1 · über 3 bis 8 → 2 · über 8 → 3. Umrechnung: pro Woche ÷ 7, pro Monat ÷ 30.
- **Teil 2 (5.8–5.11), Summe pro Tag:** seltener als wöchentlich → 0 · ein- bis mehrmals wöchentlich → 1 · ein- bis unter dreimal täglich → 2 · mindestens dreimal täglich → 3.
- **Teil 3 (5.12–5.15), gewichtete Summe pro Monat:** 5.13 und 5.14 zählen je Vorkommen 1, 5.12 und 5.15 zählen 2; pro Tag × 30, pro Woche × 4,3. Punkte: unter 4,3 → 0 · bis unter 8,6 → 1 · bis unter 12,9 → 2 · bis unter 60 → 3 · ab 60 → 6.
- **Teil 4 (5.16):** 0 bis 3 Punkte.

### Bestandsschutz

Der Kabinettsentwurf sieht in § 142b SGB XI-E vor, dass ein vor dem 01.01.2027 festgestellter Pflegegrad bei einer Neubegutachtung nicht allein wegen der neuen Schwellenwerte und der geänderten Anlage 2 verloren gehen soll – wohl aber bei tatsächlicher Verbesserung der Selbständigkeit. Für Erst- und Höherstufungsanträge soll das Recht zum Zeitpunkt der Antragstellung gelten. Der Rechner zeigt dazu einen Hinweis, wenn die Rechtsstände auseinanderfallen; er ersetzt keine Prüfung des Einzelfalls.

## Grenzen

- Nur Erwachsene. Die Sonderregeln für Kinder (Altersvergleich, abweichende Pflegegrad-Zuordnung bis 18 Monate, Kriterium 4.K) sind nicht abgebildet.
- Die Zuordnung zu den vier Selbständigkeitsstufen folgt den Begutachtungs-Richtlinien (BRi) des Medizinischen Dienstes Bund; die Erläuterungen im Rechner sind Kurzfassungen und ersetzen die Richtlinien nicht.
- Modul 4, Kriterien 4.11/4.12 zählen nach den Richtlinien nur bei überwiegender oder vollständiger Inkontinenz bzw. künstlicher Ableitung; der Rechner prüft das nicht, sondern weist darauf hin.

## Entwicklung

Es gibt keinen Build-Schritt. Die Rechenlogik liegt getrennt von der Oberfläche im Script-Block `nba-core` und ist ohne Browser testbar:

```sh
node test.js
```

Beiträge sind willkommen – insbesondere der Abgleich der Anlage 2 mit dem verkündeten Gesetzestext und Hinweise auf Abweichungen zu den Begutachtungs-Richtlinien.

## Quellen

- [§ 15 SGB XI](https://www.gesetze-im-internet.de/sgb_11/__15.html), [Anlage 1](https://www.gesetze-im-internet.de/sgb_11/anlage_1.html) und [Anlage 2](https://www.gesetze-im-internet.de/sgb_11/anlage_2.html) zu § 15 SGB XI (gesetze-im-internet.de)
- [Bundesministerium für Gesundheit: Pflegeneuordnungsgesetz (PNOG)](https://www.bundesgesundheitsministerium.de/service/gesetze-und-verordnungen/detail/pflegeneuordnungsgesetz-pnog) – Kabinettsentwurf vom 30.09.2026 und Referentenentwurf vom 05.06.2026
- [Pflege-Dschungel: Die Einstufung zum Pflegegrad soll strenger werden](https://pflege-dschungel.de/neuerungen-zur-pflegegrad-einstufung/) – Auswertung der geänderten Anlage 2
- [Bundesverband wir pflegen e. V.: Stellungnahme zu den Schwellenwerten](https://www.wir-pflegen.net/images/downloads/stellungnahmen/260605_Stellungnahme_Schwellenwerte_Pflegegrade.pdf)
- Begutachtungs-Richtlinien (BRi) des Medizinischen Dienstes Bund in der jeweils geltenden Fassung

## Lizenz

[MIT](LICENSE)
