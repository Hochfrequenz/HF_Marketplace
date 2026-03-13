# HF Marketplace

A marketplace for Claude Code Skills. Browse, search, and install community-built skills.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a Skill

1. Create a directory under `skills/your-skill-name/`
2. Add `skill.yaml` with metadata
3. Add `README.md` with documentation
4. Open a Pull Request

See the [Submit page](/submit) for details.

## Skill YAML Schema

```yaml
name: my-skill-name
displayName: My Skill Name
description: A short description
author: your-name
version: 1.0.0
category: development  # development | testing | workflow | productivity
tags: [tag1, tag2]
compatibility: ">=1.0.0"
installCommand: "claude skill install my-skill-name"
sourceUrl: "https://github.com/..."
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- YAML-based skill storage
