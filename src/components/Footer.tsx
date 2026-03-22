import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span>🤖</span>
            <span>AI 工具目錄</span>
          </div>
          <p className="max-w-md text-sm text-[var(--muted)]">
            台灣最完整的 AI 工具評測與比較平台。所有價格僅供參考，請以各官方網站為準。
          </p>
          <div className="flex gap-6 text-sm text-[var(--muted)]">
            <Link href="/terms" className="transition-colors hover:text-[var(--foreground)]">
              使用條款
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-[var(--foreground)]">
              隱私政策
            </Link>
          </div>
          <p className="text-xs text-[var(--muted-light)]">
            &copy; {new Date().getFullYear()} AI 工具目錄 AIToolsTW。本站不隸屬於任何 AI 公司。
          </p>
        </div>
      </div>
    </footer>
  );
}
