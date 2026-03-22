import type { Pricing } from "@/data/config";

interface PricingTableProps {
  pricing: Pricing;
}

export default function PricingTable({ pricing }: PricingTableProps) {
  const periodLabel = (p: string) => {
    switch (p) {
      case "month":
        return "/月";
      case "year":
        return "/年";
      case "one-time":
        return " (一次性)";
      case "usage":
        return " (用量計費)";
      default:
        return "";
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pricing.plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-xl border p-5 ${
            plan.priceUSD === 0
              ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
              : "border-[var(--card-border)] bg-[var(--card-bg)]"
          }`}
        >
          {plan.priceUSD === 0 && (
            <span className="absolute -top-2.5 left-4 free-badge">免費方案</span>
          )}

          <h4 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
            {plan.name}
          </h4>

          <div className="mb-4">
            <span className="text-3xl font-bold text-[var(--foreground)]">
              NT${plan.priceTWD.toLocaleString()}
            </span>
            <span className="text-sm text-[var(--muted)]">
              {periodLabel(plan.period)}
            </span>
            {plan.priceUSD > 0 && (
              <p className="mt-0.5 text-xs text-[var(--muted-light)]">
                US${plan.priceUSD}{periodLabel(plan.period)}
              </p>
            )}
          </div>

          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-[var(--muted)]"
              >
                <span className="mt-0.5 text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
