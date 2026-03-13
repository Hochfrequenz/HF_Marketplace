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
