# HF_Marketplace - Design Document

## Overview

A marketplace for Claude Code Skills built with Next.js + TypeScript. Skills are stored as YAML files in the repository. Community contributions happen via GitHub Pull Requests.

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS (dark theme)
- **Data**: YAML files in `/skills/` directory, parsed at build time
- **Deployment**: GitHub Pages or Vercel

## Architecture

```
HF_Marketplace/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage with skill grid
│   │   ├── skills/[slug]/      # Skill detail page
│   │   ├── submit/             # Submission guide
│   │   ├── categories/[cat]/   # Category filter view
│   │   └── layout.tsx          # Root layout
│   ├── components/             # UI components
│   │   ├── SkillCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SkillDetail.tsx
│   │   └── Header.tsx
│   └── lib/
│       ├── skills.ts           # Load skills from YAML
│       └── types.ts            # TypeScript types
├── skills/                     # Skill definitions (YAML)
│   ├── <skill-name>/
│   │   ├── skill.yaml          # Metadata
│   │   └── README.md           # Documentation
├── public/                     # Static assets
└── package.json
```

## Skill Format (skill.yaml)

```yaml
name: systematic-debugging
displayName: Systematic Debugging
description: Structured approach to debugging any bug or test failure
author: community
version: 1.0.0
category: development       # development | testing | workflow | productivity
tags: [debugging, bugfix]
compatibility: ">=1.0.0"
installCommand: "claude skill install systematic-debugging"
sourceUrl: "https://github.com/..."
```

## Pages & Features

### Homepage
- Search bar with full-text search across skill names, descriptions, tags
- Category filter chips (development, testing, workflow, productivity)
- Responsive grid of SkillCards showing name, description, author, category

### Skill Detail Page (`/skills/[slug]`)
- Full description and rendered README.md
- Installation instructions with copy-to-clipboard
- Source code link
- Tags and category

### Submit Page (`/submit`)
- Step-by-step guide for submitting a skill via GitHub PR
- Link to PR template
- YAML schema reference

### Category Pages (`/categories/[cat]`)
- Filtered view of skills by category

## Styling

- Tailwind CSS with dark theme (developer-focused audience)
- Responsive design (mobile, tablet, desktop)
- Clean, modern UI

## Data Flow

1. Skills are YAML files in `/skills/<name>/skill.yaml`
2. At build time, `lib/skills.ts` reads all skill directories and parses YAML
3. Next.js generates static pages for each skill
4. Search/filter works client-side on pre-loaded skill data

## Upload Workflow

1. Fork the repository
2. Add skill directory with `skill.yaml` and `README.md`
3. Open a Pull Request
4. Review and merge

## Decisions

- **Git-based storage**: No external database needed, version control built-in
- **Static generation**: Fast, no server costs, works with GitHub Pages
- **YAML format**: Human-readable, easy to validate, familiar to developers
- **PR-based uploads**: Built-in review process, community governance
