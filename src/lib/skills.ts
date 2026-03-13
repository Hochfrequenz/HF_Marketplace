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
