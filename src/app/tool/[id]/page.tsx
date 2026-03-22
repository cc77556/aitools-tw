import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  tools,
  categories,
  getToolById,
  getCategoryById,
  getToolsByCategory,
} from "@/data/config";
import RatingStars from "@/components/RatingStars";
import PricingTable from "@/components/PricingTable";
import ToolCard from "@/components/ToolCard";
import Disclaimer from "@/components/Disclaimer";

export function generateStaticParams() {
  return tools.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tool = getToolById(id);
  if (!tool) return {};
  const category = getCategoryById(tool.category);
  return {
    title: `${tool.name} — ${category?.name || "AI 工具"}評測與定價`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = getToolById(id);
  if (!tool) notFound();

  const category = getCategoryById(tool.category);
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: category?.name || "AI Tool",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: tool.pricing.plans
      .filter((p) => p.priceUSD > 0)
      .map((p) => ({
        "@type": "Offer",
        price: p.priceUSD,
        priceCurrency: "USD",
        name: p.name,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--foreground)]">
            首頁
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/category/${category.id}`}
                className="hover:text-[var(--foreground)]"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[var(--foreground)]">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <span className="text-5xl">{tool.icon}</span>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                {tool.name}
              </h1>
              {tool.nameZh && (
                <span className="text-lg text-[var(--muted)]">
                  {tool.nameZh}
                </span>
              )}
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
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
              {tool.pricing.free && <span className="free-badge">免費</span>}
            </div>
            <RatingStars
              rating={tool.rating}
              reviewCount={tool.reviewCount}
              size="lg"
            />
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            簡介
          </h2>
          <p className="leading-relaxed text-[var(--muted)]">
            {tool.description}
          </p>
        </section>

        {/* Features */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            主要功能
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {tool.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-[var(--muted)]"
              >
                <span className="mt-0.5 text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            定價方案
          </h2>
          {tool.pricing.freeTier && (
            <p className="mb-4 text-sm text-[var(--muted)]">
              免費方案：{tool.pricing.freeTier}
            </p>
          )}
          <PricingTable pricing={tool.pricing} />
        </section>

        {/* Use cases */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            適用情境
          </h2>
          <ul className="space-y-2">
            {tool.useCases.map((uc) => (
              <li
                key={uc}
                className="flex items-start gap-2 text-sm text-[var(--muted)]"
              >
                <span className="mt-0.5">👉</span>
                {uc}
              </li>
            ))}
          </ul>
        </section>

        {/* External link */}
        <div className="mb-8">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            前往官網 →
          </a>
        </div>

        {/* Tags */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mb-8">
          <Disclaimer />
        </div>

        {/* Related tools */}
        {related.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              相關工具
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <ToolCard
                  key={t.id}
                  tool={t}
                  category={categoryMap[t.category]}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
