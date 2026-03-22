import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryById,
  getToolsByCategory,
} from "@/data/config";
import ToolCard from "@/components/ToolCard";

export function generateStaticParams() {
  return categories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return {};
  return {
    title: `${category.name} AI 工具推薦`,
    description: `${category.description}。精選${category.name}類 AI 工具，含台幣定價、功能比較。`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const toolsInCategory = getToolsByCategory(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">
          首頁
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            {category.name}
          </h1>
        </div>
        <p className="text-[var(--muted)]">{category.description}</p>
        <p className="mt-1 text-sm text-[var(--muted-light)]">
          共 {toolsInCategory.length} 個工具
        </p>
      </div>

      {/* Tools grid */}
      {toolsInCategory.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolsInCategory.map((tool) => (
            <ToolCard key={tool.id} tool={tool} category={category} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-[var(--muted)]">
          此分類暫無收錄工具
        </p>
      )}
    </div>
  );
}
