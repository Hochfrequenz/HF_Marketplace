# HF_Marketplace Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a marketplace web app for browsing, searching, and submitting Claude Code Skills, with skill data stored as YAML files in the repository.

**Architecture:** Next.js App Router with static generation. Skills are YAML files in `/skills/` parsed at build time into typed data. Client-side search and category filtering on pre-loaded skill list. Dark-themed Tailwind CSS UI.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, gray-matter (YAML parsing), react-markdown (README rendering)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `next.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

**Step 1: Initialize Next.js project**

Run:
```bash
cd C:/Users/JonatanMeiske/Documents/50_KI_Agenten/HF_Marketplace
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

Expected: Project scaffolded with Next.js, TypeScript, Tailwind, App Router.

**Step 2: Install additional dependencies**

Run:
```bash
npm install gray-matter react-markdown remark-gfm js-yaml
npm install -D @types/js-yaml
```

**Step 3: Configure dark theme in globals.css**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --foreground: #e5e5e5;
  --card-bg: #141414;
  --card-border: #262626;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --muted: #737373;
  --tag-bg: #1e293b;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
```

**Step 4: Set up root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HF Marketplace - Claude Code Skills",
  description: "Discover, browse, and share Claude Code Skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
```

**Step 5: Verify it builds**

Run: `npm run build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind dark theme"
```

---

### Task 2: TypeScript Types & Skill Loader

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/skills.ts`

**Step 1: Define Skill types**

Create `src/lib/types.ts`:

```ts
export type SkillCategory = "development" | "testing" | "workflow" | "productivity";

export interface Skill {
  name: string;
  displayName: string;
  description: string;
  author: string;
  version: string;
  category: SkillCategory;
  tags: string[];
  compatibility: string;
  installCommand: string;
  sourceUrl: string;
  slug: string;
  readme: string;
}
```

**Step 2: Create skill loader**

Create `src/lib/skills.ts`:

```ts
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Skill } from "./types";

const SKILLS_DIR = path.join(process.cwd(), "skills");

export function getAllSkills(): Skill[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];

  const dirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  return dirs.map((dir) => {
    const yamlPath = path.join(SKILLS_DIR, dir.name, "skill.yaml");
    const readmePath = path.join(SKILLS_DIR, dir.name, "README.md");

    const yamlContent = fs.readFileSync(yamlPath, "utf-8");
    const data = yaml.load(yamlContent) as Omit<Skill, "slug" | "readme">;

    const readme = fs.existsSync(readmePath)
      ? fs.readFileSync(readmePath, "utf-8")
      : "";

    return { ...data, slug: dir.name, readme };
  });
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return getAllSkills().find((s) => s.slug === slug);
}

export function getSkillsByCategory(category: string): Skill[] {
  return getAllSkills().filter((s) => s.category === category);
}

export function getCategories(): string[] {
  const skills = getAllSkills();
  return [...new Set(skills.map((s) => s.category))];
}
```

**Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/skills.ts
git commit -m "feat: add Skill types and YAML loader"
```

---

### Task 3: Sample Skills Data

**Files:**
- Create: `skills/systematic-debugging/skill.yaml`
- Create: `skills/systematic-debugging/README.md`
- Create: `skills/test-driven-development/skill.yaml`
- Create: `skills/test-driven-development/README.md`
- Create: `skills/code-review/skill.yaml`
- Create: `skills/code-review/README.md`
- Create: `skills/git-workflow/skill.yaml`
- Create: `skills/git-workflow/README.md`

**Step 1: Create sample skills**

Create `skills/systematic-debugging/skill.yaml`:
```yaml
name: systematic-debugging
displayName: Systematic Debugging
description: A structured, methodical approach to finding and fixing bugs. Guides you through reproduction, hypothesis formation, and verification.
author: community
version: 1.0.0
category: development
tags: [debugging, bugfix, diagnostics]
compatibility: ">=1.0.0"
installCommand: "claude skill install systematic-debugging"
sourceUrl: "https://github.com/hf-marketplace/systematic-debugging"
```

Create `skills/systematic-debugging/README.md`:
```markdown
# Systematic Debugging

A structured approach to debugging that prevents random code changes and ensures root cause analysis.

## How it works

1. **Reproduce** - Create a reliable reproduction case
2. **Hypothesize** - Form a hypothesis about the cause
3. **Test** - Verify or disprove your hypothesis
4. **Fix** - Apply the minimal fix
5. **Verify** - Confirm the fix resolves the issue

## When to use

Use this skill whenever you encounter unexpected behavior, test failures, or runtime errors.
```

Create `skills/test-driven-development/skill.yaml`:
```yaml
name: test-driven-development
displayName: Test-Driven Development
description: Write failing tests first, then implement the minimal code to make them pass. Red-Green-Refactor cycle.
author: community
version: 1.0.0
category: testing
tags: [tdd, testing, quality]
compatibility: ">=1.0.0"
installCommand: "claude skill install test-driven-development"
sourceUrl: "https://github.com/hf-marketplace/test-driven-development"
```

Create `skills/test-driven-development/README.md`:
```markdown
# Test-Driven Development

Enforce the Red-Green-Refactor cycle for every feature and bugfix.

## The Cycle

1. **Red** - Write a failing test
2. **Green** - Write minimal code to pass
3. **Refactor** - Clean up while tests stay green

## Benefits

- Ensures testable design
- Prevents over-engineering
- Documents expected behavior
```

Create `skills/code-review/skill.yaml`:
```yaml
name: code-review
displayName: Code Review
description: Structured code review process that checks for correctness, readability, performance, and security.
author: community
version: 1.0.0
category: workflow
tags: [review, quality, collaboration]
compatibility: ">=1.0.0"
installCommand: "claude skill install code-review"
sourceUrl: "https://github.com/hf-marketplace/code-review"
```

Create `skills/code-review/README.md`:
```markdown
# Code Review

A systematic approach to reviewing code changes.

## Review Checklist

- Correctness: Does the code do what it claims?
- Readability: Can another developer understand it?
- Performance: Are there obvious bottlenecks?
- Security: Are there vulnerabilities?
```

Create `skills/git-workflow/skill.yaml`:
```yaml
name: git-workflow
displayName: Git Workflow
description: Best practices for branching, committing, and merging with Git. Includes conventional commits and PR workflows.
author: community
version: 1.0.0
category: productivity
tags: [git, workflow, branching, commits]
compatibility: ">=1.0.0"
installCommand: "claude skill install git-workflow"
sourceUrl: "https://github.com/hf-marketplace/git-workflow"
```

Create `skills/git-workflow/README.md`:
```markdown
# Git Workflow

Structured Git practices for clean history and smooth collaboration.

## Conventions

- Use conventional commits (feat:, fix:, docs:, etc.)
- One logical change per commit
- Feature branches off main
- Squash merge for clean history
```

**Step 2: Commit**

```bash
git add skills/
git commit -m "feat: add sample skills data (4 skills across all categories)"
```

---

### Task 4: Header Component

**Files:**
- Create: `src/components/Header.tsx`

**Step 1: Create Header**

Create `src/components/Header.tsx`:

```tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--card-border)] bg-[var(--card-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[var(--accent)]">
          HF Marketplace
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Skills
          </Link>
          <Link href="/submit" className="hover:text-[var(--accent)] transition-colors">
            Submit
          </Link>
          <a
            href="https://github.com/your-repo/HF_Marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
```

**Step 2: Add Header to layout**

Update `src/app/layout.tsx` to import and render `<Header />` inside `<body>` above `{children}`.

**Step 3: Commit**

```bash
git add src/components/Header.tsx src/app/layout.tsx
git commit -m "feat: add Header component with navigation"
```

---

### Task 5: SkillCard & CategoryFilter Components

**Files:**
- Create: `src/components/SkillCard.tsx`
- Create: `src/components/CategoryFilter.tsx`

**Step 1: Create SkillCard**

Create `src/components/SkillCard.tsx`:

```tsx
import Link from "next/link";
import { Skill } from "@/lib/types";

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="block rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-5 hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{skill.displayName}</h3>
        <span className="text-xs px-2 py-1 rounded bg-[var(--tag-bg)] text-[var(--accent)]">
          {skill.category}
        </span>
      </div>
      <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">
        {skill.description}
      </p>
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>by {skill.author}</span>
        <span>v{skill.version}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {skill.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

**Step 2: Create CategoryFilter**

Create `src/components/CategoryFilter.tsx`:

```tsx
"use client";

import { SkillCategory } from "@/lib/types";

const CATEGORIES: { value: SkillCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "development", label: "Development" },
  { value: "testing", label: "Testing" },
  { value: "workflow", label: "Workflow" },
  { value: "productivity", label: "Productivity" },
];

interface Props {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            selected === cat.value
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--tag-bg)] text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/SkillCard.tsx src/components/CategoryFilter.tsx
git commit -m "feat: add SkillCard and CategoryFilter components"
```

---

### Task 6: SearchBar Component

**Files:**
- Create: `src/components/SearchBar.tsx`

**Step 1: Create SearchBar**

Create `src/components/SearchBar.tsx`:

```tsx
"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search skills..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
      />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/SearchBar.tsx
git commit -m "feat: add SearchBar component"
```

---

### Task 7: Homepage (Skill Grid with Search & Filter)

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/skills-grid.tsx` (client component)

**Step 1: Create client-side SkillsGrid**

Create `src/app/skills-grid.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Skill } from "@/lib/types";
import SkillCard from "@/components/SkillCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = skills.filter((skill) => {
    const matchesCategory = category === "all" || skill.category === category;
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      skill.displayName.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      skill.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>
      <div className="mb-8">
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-[var(--muted)] py-12">
          No skills found. Try a different search or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </>
  );
}
```

**Step 2: Create homepage**

Replace `src/app/page.tsx`:

```tsx
import { getAllSkills } from "@/lib/skills";
import SkillsGrid from "./skills-grid";

export default function Home() {
  const skills = getAllSkills();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Claude Code Skills</h1>
        <p className="text-[var(--muted)]">
          Discover and install skills to supercharge your Claude Code workflow.
        </p>
      </div>
      <SkillsGrid skills={skills} />
    </main>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds, homepage renders.

**Step 4: Commit**

```bash
git add src/app/page.tsx src/app/skills-grid.tsx
git commit -m "feat: add homepage with skill grid, search, and category filter"
```

---

### Task 8: Skill Detail Page

**Files:**
- Create: `src/app/skills/[slug]/page.tsx`

**Step 1: Create skill detail page**

Create `src/app/skills/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function generateStaticParams() {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const skill = getSkillBySlug(params.slug);
  if (!skill) return { title: "Skill Not Found" };
  return {
    title: `${skill.displayName} - HF Marketplace`,
    description: skill.description,
  };
}

export default function SkillPage({ params }: { params: { slug: string } }) {
  const skill = getSkillBySlug(params.slug);
  if (!skill) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--accent)] mb-6 inline-block"
      >
        &larr; Back to Skills
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold">{skill.displayName}</h1>
          <span className="px-3 py-1 rounded-full text-sm bg-[var(--tag-bg)] text-[var(--accent)]">
            {skill.category}
          </span>
        </div>
        <p className="text-[var(--muted)] mb-4">{skill.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-[var(--tag-bg)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-8">
          <div>
            <span className="text-[var(--muted)]">Author</span>
            <p className="font-medium">{skill.author}</p>
          </div>
          <div>
            <span className="text-[var(--muted)]">Version</span>
            <p className="font-medium">{skill.version}</p>
          </div>
          <div>
            <span className="text-[var(--muted)]">Compatibility</span>
            <p className="font-medium">{skill.compatibility}</p>
          </div>
          <div>
            <span className="text-[var(--muted)]">Source</span>
            <a
              href={skill.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)] hover:underline block truncate"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Install Command */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4 mb-8">
          <span className="text-sm text-[var(--muted)] block mb-2">Install</span>
          <code className="text-sm text-[var(--accent)] select-all">
            {skill.installCommand}
          </code>
        </div>
      </div>

      {/* README */}
      {skill.readme && (
        <div className="prose prose-invert max-w-none border-t border-[var(--card-border)] pt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {skill.readme}
          </ReactMarkdown>
        </div>
      )}
    </main>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Static pages generated for each skill slug.

**Step 3: Commit**

```bash
git add src/app/skills/
git commit -m "feat: add skill detail page with README rendering"
```

---

### Task 9: Submit Page

**Files:**
- Create: `src/app/submit/page.tsx`

**Step 1: Create submit page**

Create `src/app/submit/page.tsx`:

```tsx
export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Submit a Skill</h1>
      <p className="text-[var(--muted)] mb-8">
        Share your Claude Code skill with the community. Skills are submitted via GitHub Pull Requests.
      </p>

      <div className="space-y-6">
        <section className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
          <h2 className="text-xl font-semibold mb-3">How to Submit</h2>
          <ol className="list-decimal list-inside space-y-3 text-[var(--muted)]">
            <li>Fork the <a href="https://github.com/your-repo/HF_Marketplace" className="text-[var(--accent)] hover:underline">HF_Marketplace repository</a></li>
            <li>Create a new directory under <code className="text-[var(--accent)]">skills/your-skill-name/</code></li>
            <li>Add a <code className="text-[var(--accent)]">skill.yaml</code> with your skill metadata</li>
            <li>Add a <code className="text-[var(--accent)]">README.md</code> documenting your skill</li>
            <li>Open a Pull Request</li>
          </ol>
        </section>

        <section className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
          <h2 className="text-xl font-semibold mb-3">skill.yaml Schema</h2>
          <pre className="text-sm bg-[var(--background)] rounded p-4 overflow-x-auto">
{`name: my-skill-name
displayName: My Skill Name
description: A short description of what the skill does
author: your-name
version: 1.0.0
category: development  # development | testing | workflow | productivity
tags: [tag1, tag2, tag3]
compatibility: ">=1.0.0"
installCommand: "claude skill install my-skill-name"
sourceUrl: "https://github.com/your-repo/my-skill"`}
          </pre>
        </section>

        <section className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
          <h2 className="text-xl font-semibold mb-3">Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
            <li>Skill names should be lowercase with hyphens (e.g., <code className="text-[var(--accent)]">my-skill</code>)</li>
            <li>Write a clear, concise description (1-2 sentences)</li>
            <li>Include at least 1-3 relevant tags</li>
            <li>Choose the most appropriate category</li>
            <li>Document usage and examples in README.md</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/submit/
git commit -m "feat: add submit page with PR submission guide"
```

---

### Task 10: Category Pages

**Files:**
- Create: `src/app/categories/[cat]/page.tsx`

**Step 1: Create category page**

Create `src/app/categories/[cat]/page.tsx`:

```tsx
import { getAllSkills, getSkillsByCategory, getCategories } from "@/lib/skills";
import SkillCard from "@/components/SkillCard";
import Link from "next/link";

export function generateStaticParams() {
  return getCategories().map((cat) => ({ cat }));
}

export function generateMetadata({ params }: { params: { cat: string } }) {
  return {
    title: `${params.cat.charAt(0).toUpperCase() + params.cat.slice(1)} Skills - HF Marketplace`,
  };
}

export default function CategoryPage({ params }: { params: { cat: string } }) {
  const skills = getSkillsByCategory(params.cat);
  const categoryLabel = params.cat.charAt(0).toUpperCase() + params.cat.slice(1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--accent)] mb-6 inline-block"
      >
        &larr; Back to All Skills
      </Link>
      <h1 className="text-3xl font-bold mb-8">{categoryLabel} Skills</h1>

      {skills.length === 0 ? (
        <p className="text-[var(--muted)]">No skills in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/categories/
git commit -m "feat: add category filter pages"
```

---

### Task 11: Final Build, .gitignore & README

**Files:**
- Create: `.gitignore`
- Create: `README.md`

**Step 1: Verify full build**

Run: `npm run build`
Expected: All pages generated successfully.

**Step 2: Run dev server and verify**

Run: `npm run dev`
Verify: Homepage loads, search works, category filter works, skill detail pages render.

**Step 3: Add README.md**

Create `README.md`:

```markdown
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

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- YAML-based skill storage
```

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: finalize marketplace with README and build verification"
```
