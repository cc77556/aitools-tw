import type { Metadata } from "next";
import { tools, categories } from "@/data/config";
import ToolList from "@/components/ToolList";

export const metadata: Metadata = {
  title: "所有 AI 工具",
  description: "瀏覽所有收錄的 AI 工具，依分類、價格、評分篩選與排序",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          所有 AI 工具
        </h1>
        <p className="mt-1 text-[var(--muted)]">
          瀏覽、搜尋、篩選最適合你的 AI 工具
        </p>
      </div>
      <ToolList tools={tools} categories={categories} />
    </div>
  );
}
