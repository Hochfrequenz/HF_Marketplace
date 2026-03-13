import { getSkillsByCategory, getCategories } from "@/lib/skills";
import SkillCard from "@/components/SkillCard";
import Link from "next/link";

export function generateStaticParams() {
  return getCategories().map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  return {
    title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Skills - HF Marketplace`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const skills = getSkillsByCategory(cat);
  const categoryLabel = cat.charAt(0).toUpperCase() + cat.slice(1);

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
