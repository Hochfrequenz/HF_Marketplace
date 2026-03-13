---
name: isu-ask
description: Use when the user asks a SAP IS-U question about Stammdaten, Geräte, Ablesung, Abrechnung, Faktura, FI-CA, Marktkommunikation, or IS-U Prozesse — searches local ChromaDB knowledge base before answering
---

# SAP IS-U Wissensdatenbank

Beantwortet SAP IS-U Fragen aus lokalem PDF-Index und Expertenwissen (ChromaDB).

## Prozess

1. Domäne bestimmen (Tabelle unten)
2. PDF-Index + Expertenwissen in einem Aufruf durchsuchen
3. Antwort aus Ergebnissen synthetisieren — mit Seitenangaben und SAP-Transaktionen
4. Bei bestem Score < 0.45: Unsicherheit explizit nennen

## Suchbefehl

```bash
python "<SKILL_PROJECT_PATH>/isu_cli.py" search "QUERY" DOMAIN
```

**WICHTIG:** Exakt diesen Befehl verwenden — kein `cd`, kein `2>/dev/null`, kein `&&`, keine Shell-Redirects. Nur diesen einen Befehl, sonst blockiert ein Security-Hook.

Ausgabe: JSON mit `pdf` (Treffer aus Handbuch) und `learnings` (Expertenwissen).

## Domänen

| Domain | Themen | Seiten |
|--------|--------|--------|
| stammdaten | Vertragskonto, Geschäftspartner, Anlage, Zählpunkt, BP | 99–152 |
| geraete | Gerät, Zähler, Installation, Gerätewechsel | 153–195 |
| ablesung | Ablesung, EA00, Zählerstand, Ablesungsauftrag | 135–215, 571–610 |
| abrechnung | Abrechnungslauf, Tarifierung, Verbrauch | 191–260 |
| faktura | FPE1, Rechnung, Zahlung, FI-CA, Mahnung | 241–275 |
| prozesse | Marktkommunikation, Lieferwechsel, Smart Metering, Einzug | 153–340, 539–645 |

## Learnings speichern

Neue Erkenntnisse nach der Antwort speichern:

```bash
python "<SKILL_PROJECT_PATH>/isu_cli.py" learn DOMAIN "FRAGE" "ANTWORT"
```

## Setup

Vor der ersten Nutzung muss das ISU-Agent-Skill Projekt eingerichtet werden:

```bash
cd <SKILL_PROJECT_PATH>
python init.py
```
