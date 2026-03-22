import Link from "next/link";
import type { Tool, Category } from "@/data/config";
import RatingStars from "./RatingStars";

interface ToolCardProps {
  tool: Tool;
  category?: Category;
}

export default function ToolCard({ tool, category }: ToolCardProps) {
  const lowestPaidPlan = tool.pricing.plans.find((p) => p.priceUSD > 0);

  return (
    <Link href={`/tool/${tool.id}`} className="block">
      <div className="tool-card flex h-full flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{tool.icon}</span>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">
                {tool.name}
              </h3>
              {tool.nameZh && (
                <p className="text-xs text-[var(--muted)]">{tool.nameZh}</p>
              )}
            </div>
          </div>
          {tool.pricing.free && <span className="free-badge">免費</span>}
        </div>

        <p className="mb-3 line-clamp-2 flex-1 text-sm text-[var(--muted)]">
          {tool.description}
        </p>

        <div className="mb-3">
          <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} size="sm" />
        </div>

        <div className="flex items-center justify-between">
          {category && (
            <span
              className="category-pill"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
              }}
            >
              {category.icon} {category.name}
            </span>
          )}
          {lowestPaidPlan ? (
            <span className="text-sm font-semibold text-[var(--foreground)]">
              NT${lowestPaidPlan.priceTWD.toLocaleString()}
              <span className="text-xs font-normal text-[var(--muted)]">
                /{lowestPaidPlan.period === "month" ? "月" : lowestPaidPlan.period === "year" ? "年" : lowestPaidPlan.period === "one-time" ? "次" : "用量"}
              </span>
            </span>
          ) : (
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              免費
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
