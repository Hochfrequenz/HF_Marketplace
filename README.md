# HF Marketplace

A marketplace for Claude Code Skills. Browse, search, and install community-built skills.

## Skills installieren

### Schnellinstallation

Im Root deines Projekts:

```bash
# Marktplatz einrichten und verfügbare Skills anzeigen
curl -sL https://raw.githubusercontent.com/Hochfrequenz/HF_Marketplace/master/install.sh | bash

# Einen bestimmten Skill installieren
curl -sL https://raw.githubusercontent.com/Hochfrequenz/HF_Marketplace/master/install.sh | bash -s -- systematic-debugging

# Alle Skills installieren
curl -sL https://raw.githubusercontent.com/Hochfrequenz/HF_Marketplace/master/install.sh | bash -s -- --all
```

### Manuelle Installation

```bash
# 1. Marktplatz als Submodule hinzufügen
git submodule add https://github.com/Hochfrequenz/HF_Marketplace.git .claude/marketplace

# 2. Skill-Datei kopieren
mkdir -p .claude/skills/<skill-name>
cp .claude/marketplace/skills/<skill-name>/SKILL.md .claude/skills/<skill-name>/

# 3. Claude Code nutzt den Skill automatisch
```

## Web-UI entwickeln

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Skill hinzufügen

Jeder Skill braucht 3 Dateien unter `skills/<skill-name>/`:

| Datei | Zweck |
|-------|-------|
| `skill.yaml` | Metadaten für die Web-UI (Name, Beschreibung, Tags) |
| `SKILL.md` | Die eigentliche Skill-Definition für Claude Code |
| `README.md` | Dokumentation und Nutzungsanleitung |

### skill.yaml Schema

```yaml
name: my-skill-name
displayName: My Skill Name
description: A short description
author: your-name
version: 1.0.0
category: development  # development | testing | workflow | productivity
tags: [tag1, tag2]
compatibility: ">=1.0.0"
installCommand: "./install.sh my-skill-name"
sourceUrl: "https://github.com/..."
```

### SKILL.md Format

```markdown
---
name: my-skill-name
description: Trigger description for Claude Code
---

# Skill Title

Instructions for Claude Code...
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- YAML-based skill storage
