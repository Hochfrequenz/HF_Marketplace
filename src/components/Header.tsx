import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--card-border)] bg-[var(--card-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[var(--accent)]">
          HF Marketplace
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Skills
          </Link>
          <Link href="/submit" className="hover:text-[var(--accent)] transition-colors">
            Submit
          </Link>
          <a
            href="https://github.com/your-repo/HF_Marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
