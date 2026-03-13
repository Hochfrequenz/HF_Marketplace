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
