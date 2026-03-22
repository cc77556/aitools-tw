"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span className="text-2xl">🤖</span>
          <span>AI 工具目錄</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            首頁
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            所有工具
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            比較
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="選單"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 md:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[var(--foreground)]"
          >
            首頁
          </Link>
          <Link
            href="/tools"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[var(--foreground)]"
          >
            所有工具
          </Link>
          <Link
            href="/compare"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[var(--foreground)]"
          >
            比較
          </Link>
        </nav>
      )}
    </header>
  );
}
