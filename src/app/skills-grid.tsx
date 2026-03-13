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
