import type { Metadata } from "next";
import { tools, categories } from "@/data/config";
import CompareTools from "@/components/CompareTools";

export const metadata: Metadata = {
  title: "比較 AI 工具",
  description: "並排比較 AI 工具的功能、定價與評分，找出最適合你的選擇",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          比較 AI 工具
        </h1>
        <p className="mt-1 text-[var(--muted)]">
          選擇 2-3 個工具並排比較，找出最適合你的 AI 工具
        </p>
      </div>
      <CompareTools tools={tools} categories={categories} />
    </div>
  );
}
