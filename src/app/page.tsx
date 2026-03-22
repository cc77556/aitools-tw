import Link from "next/link";
import { categories, tools, getTopRatedTools, getFreeTools } from "@/data/config";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  const topTools = getTopRatedTools(6);
  const freeTools = getFreeTools().slice(0, 6);
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-[var(--background)] px-4 py-16 text-center dark:from-indigo-950/20 sm:py-24">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
          找到最適合你的{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            AI 工具
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--muted)] sm:text-lg">
          收錄熱門 AI 工具，中文介紹、台幣定價、功能比較，幫你快速做出選擇
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-lg">
          <Link
            href="/tools"
            className="flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-3.5 text-[var(--muted-light)] shadow-sm transition-shadow hover:shadow-md"
          >
            <span>🔍</span>
            <span className="text-sm">搜尋 AI 工具...</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-6 text-sm font-medium text-[var(--muted)] sm:gap-8">
          <span>{tools.length}+ 工具</span>
          <span className="text-[var(--card-border)]">|</span>
          <span>{categories.length} 大分類</span>
          <span className="text-[var(--card-border)]">|</span>
          <span>台幣定價</span>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
            分類瀏覽
          </h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="tool-card flex flex-col items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-center"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {cat.name}
              </span>
              <span className="text-xs text-[var(--muted)]">
                {cat.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot tools */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
            🔥 熱門工具
          </h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              category={categoryMap[tool.category]}
            />
          ))}
        </div>
      </section>

      {/* Free tools */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
            🆓 免費 AI 工具
          </h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              category={categoryMap[tool.category]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
