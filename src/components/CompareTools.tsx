"use client";

import { useState, useMemo } from "react";
import type { Tool, Category } from "@/data/config";
import RatingStars from "./RatingStars";

interface CompareToolsProps {
  tools: Tool[];
  categories: Category[];
}

export default function CompareTools({ tools, categories }: CompareToolsProps) {
  const [selected, setSelected] = useState<(string | "")[]>(["", "", ""]);

  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((c) => (map[c.id] = c));
    return map;
  }, [categories]);

  const selectedTools = selected
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as Tool[];

  function setSlot(index: number, value: string) {
    const next = [...selected];
    next[index] = value;
    setSelected(next);
  }

  const periodLabel = (p: string) => {
    switch (p) {
      case "month": return "/月";
      case "year": return "/年";
      case "one-time": return " (一次性)";
      case "usage": return " (用量計費)";
      default: return "";
    }
  };

  return (
    <div>
      {/* Selectors */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <label className="mb-1.5 block text-sm font-medium text-[var(--muted)]">
              工具 {i + 1}
            </label>
            <select
              value={selected[i]}
              onChange={(e) => setSlot(i, e.target.value)}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:border-primary focus:outline-none"
            >
              <option value="">選擇工具...</option>
              {tools.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      {selectedTools.length >= 2 ? (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)] bg-[var(--surface)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted)]">
                  比較項目
                </th>
                {selectedTools.map((t) => (
                  <th
                    key={t.id}
                    className="px-4 py-3 text-left font-semibold text-[var(--foreground)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{t.icon}</span>
                      {t.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Category */}
              <tr className="border-b border-[var(--card-border)]">
                <td className="px-4 py-3 font-medium text-[var(--muted)]">分類</td>
                {selectedTools.map((t) => {
                  const cat = categoryMap[t.category];
                  return (
                    <td key={t.id} className="px-4 py-3">
                      {cat && (
                        <span
                          className="category-pill"
                          style={{
                            backgroundColor: `${cat.color}15`,
                            color: cat.color,
                          }}
                        >
                          {cat.icon} {cat.name}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Rating */}
              <tr className="border-b border-[var(--card-border)]">
                <td className="px-4 py-3 font-medium text-[var(--muted)]">評分</td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="px-4 py-3">
                    <RatingStars
                      rating={t.rating}
                      reviewCount={t.reviewCount}
                      size="sm"
                    />
                  </td>
                ))}
              </tr>

              {/* Free tier */}
              <tr className="border-b border-[var(--card-border)]">
                <td className="px-4 py-3 font-medium text-[var(--muted)]">
                  免費方案
                </td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="px-4 py-3">
                    {t.pricing.free ? (
                      <div>
                        <span className="free-badge">免費</span>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {t.pricing.freeTier}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[var(--muted)]">無免費方案</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Pricing */}
              <tr className="border-b border-[var(--card-border)]">
                <td className="px-4 py-3 font-medium text-[var(--muted)]">定價</td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="px-4 py-3">
                    <div className="space-y-1">
                      {t.pricing.plans
                        .filter((p) => p.priceUSD > 0)
                        .map((p) => (
                          <div key={p.name}>
                            <span className="font-semibold">
                              NT${p.priceTWD.toLocaleString()}
                            </span>
                            <span className="text-xs text-[var(--muted)]">
                              {periodLabel(p.period)}
                            </span>
                            <span className="ml-1 text-xs text-[var(--muted-light)]">
                              ({p.name})
                            </span>
                          </div>
                        ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr className="border-b border-[var(--card-border)]">
                <td className="px-4 py-3 font-medium text-[var(--muted)]">主要功能</td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="px-4 py-3">
                    <ul className="space-y-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs">
                          <span className="mt-0.5 text-green-500">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Use cases */}
              <tr>
                <td className="px-4 py-3 font-medium text-[var(--muted)]">適用情境</td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="px-4 py-3">
                    <ul className="space-y-1">
                      {t.useCases.map((uc) => (
                        <li key={uc} className="text-xs text-[var(--muted)]">
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--card-border)] py-16 text-center">
          <p className="text-lg text-[var(--muted)]">請選擇至少 2 個工具進行比較</p>
          <p className="mt-1 text-sm text-[var(--muted-light)]">
            從上方下拉選單選擇想比較的 AI 工具
          </p>
        </div>
      )}
    </div>
  );
}
