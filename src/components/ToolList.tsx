"use client";

import { useState, useMemo } from "react";
import type { Tool, Category } from "@/data/config";
import ToolCard from "./ToolCard";

interface ToolListProps {
  tools: Tool[];
  categories: Category[];
}

type SortOption = "rating" | "name" | "price-low" | "price-high";

export default function ToolList({ tools, categories }: ToolListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((c) => (map[c.id] = c));
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    let result = [...tools];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameZh.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Price
    if (priceFilter === "free") {
      result = result.filter((t) => t.pricing.free);
    } else if (priceFilter === "paid") {
      result = result.filter((t) => !t.pricing.free);
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low": {
        const getMinPrice = (t: Tool) => {
          const paid = t.pricing.plans.filter((p) => p.priceUSD > 0);
          return paid.length > 0 ? Math.min(...paid.map((p) => p.priceTWD)) : 0;
        };
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      }
      case "price-high": {
        const getMaxPrice = (t: Tool) => {
          const paid = t.pricing.plans.filter((p) => p.priceUSD > 0);
          return paid.length > 0 ? Math.max(...paid.map((p) => p.priceTWD)) : 0;
        };
        result.sort((a, b) => getMaxPrice(b) - getMaxPrice(a));
        break;
      }
    }

    return result;
  }, [tools, search, selectedCategory, priceFilter, sortBy]);

  return (
    <div>
      {/* Filters bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            🔍
          </span>
          <input
            type="text"
            placeholder="搜尋 AI 工具..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-light)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:border-primary focus:outline-none"
        >
          <option value="">所有分類</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <select
          value={priceFilter}
          onChange={(e) =>
            setPriceFilter(e.target.value as "all" | "free" | "paid")
          }
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:border-primary focus:outline-none"
        >
          <option value="all">全部價格</option>
          <option value="free">免費工具</option>
          <option value="paid">付費工具</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:border-primary focus:outline-none"
        >
          <option value="rating">評分排序</option>
          <option value="name">名稱排序</option>
          <option value="price-low">價格低到高</option>
          <option value="price-high">價格高到低</option>
        </select>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-[var(--muted)]">
        找到 {filtered.length} 個工具
      </p>

      {/* Tool grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} category={categoryMap[tool.category]} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-[var(--muted)]">找不到符合條件的工具</p>
          <p className="mt-1 text-sm text-[var(--muted-light)]">
            試試調整搜尋條件或篩選器
          </p>
        </div>
      )}
    </div>
  );
}
