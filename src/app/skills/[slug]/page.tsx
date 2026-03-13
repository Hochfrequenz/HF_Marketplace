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
