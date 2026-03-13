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
