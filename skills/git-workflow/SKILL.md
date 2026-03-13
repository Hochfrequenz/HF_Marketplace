---
name: git-workflow
description: Use when working with Git — enforces conventional commits, clean branching, and structured PR workflows
---

# Git Workflow

Structured Git practices for clean history and smooth collaboration.

## Conventional Commits

Format: `<type>: <description>`

| Type | When |
|------|------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation only |
| refactor | Code change without feature/fix |
| test | Adding or updating tests |
| chore | Build, CI, tooling changes |

## Branching

- `main` — production-ready, always deployable
- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `docs/<name>` — documentation updates

## Rules

- **One logical change per commit.** Don't mix unrelated changes.
- **Write meaningful commit messages.** Focus on "why", not "what".
- **Feature branches off main.** Always branch from latest main.
- **Squash merge for clean history.** One commit per feature in main.
- **Never force-push to main.** Use `--force-with-lease` on feature branches only.

## PR Workflow

1. Create feature branch
2. Make changes with clean commits
3. Push and open PR
4. Get review approval
5. Squash merge to main
6. Delete feature branch
