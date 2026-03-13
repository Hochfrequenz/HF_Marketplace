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
