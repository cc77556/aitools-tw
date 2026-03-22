import categoriesData from "./categories.json";
import toolsData from "./tools.json";

// ─── Site Config ────────────────────────────────────────────────

export const siteConfig = {
  name: "AI 工具目錄 AIToolsTW",
  title: "AI 工具目錄 — 台灣最完整的 AI 工具評測與比較",
  description:
    "收錄 35+ 個熱門 AI 工具，中文介紹、台幣定價、功能比較，幫你找到最適合的 AI 工具。",
  url: "https://aitools-tw.vercel.app",
  locale: "zh-TW",
  exchangeRate: 32,
};

// ─── TypeScript Types ───────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Plan {
  name: string;
  priceUSD: number;
  priceTWD: number;
  period: "month" | "year" | "one-time" | "usage";
  features: string[];
}

export interface Pricing {
  free: boolean;
  freeTier: string;
  plans: Plan[];
}

export interface Tool {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  icon: string;
  description: string;
  features: string[];
  pricing: Pricing;
  url: string;
  tags: string[];
  useCases: string[];
  rating: number;
  reviewCount: number;
  updatedAt: string;
}

// ─── Data Exports ───────────────────────────────────────────────

export const categories: Category[] = categoriesData as Category[];
export const tools: Tool[] = toolsData as Tool[];

// ─── Helper Functions ───────────────────────────────────────────

/** Get all tools in a specific category */
export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((tool) => tool.category === categoryId);
}

/** Get a single tool by its slug id */
export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

/** Get a category by its id */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

/** Get all tools that have a free tier */
export function getFreeTools(): Tool[] {
  return tools.filter((tool) => tool.pricing.free);
}

/** Get all unique tags across all tools */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  tools.forEach((tool) => tool.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/** Search tools by name, description, or tags */
export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.nameZh.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

/** Convert USD to TWD using the configured exchange rate */
export function usdToTwd(usd: number): number {
  return Math.round(usd * siteConfig.exchangeRate);
}

/** Get tools sorted by rating (descending) */
export function getTopRatedTools(limit?: number): Tool[] {
  const sorted = [...tools].sort((a, b) => b.rating - a.rating);
  return limit ? sorted.slice(0, limit) : sorted;
}
