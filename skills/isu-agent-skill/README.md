# SAP IS-U Wissensagent

Ein Claude Code Skill, der Fragen zu SAP IS-U (Utilities) beantwortet. Kombiniert ein indexiertes PDF-Handbuch mit einer wachsenden Expertenwissensdatenbank.

## Domains

| Domain | Themen |
|--------|--------|
| Stammdaten | Verträge, Kunden, Anlagen, Geschäftspartner |
| Gerätewesen | Zähler, Geräte, Equipment-Verwaltung |
| Ablesung | Zählerablesung, Transaktion EA00 |
| Abrechnung | Abrechnungsläufe, Tarifierung |
| Faktura | Rechnungsstellung, FI-CA, Zahlungen |
| Prozesse | Marktkommunikation, übergreifende Prozesse |

## Features

- **Domain-spezifische RAG-Suche** - 6 spezialisierte ChromaDB-Collections
- **Lern-System** - Wächst mit Expertenkorrekturen
- **Offline-fähig** - Lokale Embeddings, kein API-Key nötig
- **Azure-ready** - Zentralisierte ChromaDB für Teams
- **SAP-Integration** - Optionale Live-Anbindung via MCP Server

## Voraussetzungen

- Python 3.11+
- Claude Code
- SAP IS-U PDF-Handbuch

## Setup

```bash
python init.py
```

## Nutzung

Stelle einfach SAP IS-U Fragen in Claude Code:

- "Was ist ein Vertragskonto?"
- "Wie funktioniert die Geräteinstallation?"
- "Erkläre den Abrechnungsprozess"
