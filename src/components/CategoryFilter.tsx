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
