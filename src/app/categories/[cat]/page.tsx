import { getSkillsByCategory, getCategories } from "@/lib/skills";
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
