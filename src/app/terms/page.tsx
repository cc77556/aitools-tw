import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用條款",
  description: "AI 工具目錄網站使用條款",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
        使用條款
      </h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-[var(--muted)]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            1. 服務說明
          </h2>
          <p>
            AI 工具目錄（AIToolsTW，以下簡稱「本站」）是一個 AI
            工具資訊整理平台，提供各種 AI
            工具的介紹、定價資訊與功能比較。本站內容僅供參考，不構成任何購買建議或專業諮詢。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            2. 價格資訊免責聲明
          </h2>
          <p>
            本站所列之 AI
            工具價格（包含新台幣與美元定價）僅供參考，可能隨時因各工具官方調整而變動。新台幣定價係以參考匯率換算，實際結帳金額可能因匯率波動而不同。使用者在訂閱或購買任何
            AI 工具前，請務必前往各工具官方網站確認最新定價。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            3. 推廣合作揭露
          </h2>
          <p>
            本站部分連結可能為推廣合作（Affiliate）連結。當您透過這些連結訂閱或購買服務時，本站可能會獲得推廣佣金。此佣金不會增加您的費用。我們致力於提供公正客觀的評測與比較資訊，推廣合作不會影響我們的評分與推薦。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            4. 非隸屬聲明
          </h2>
          <p>
            本站為獨立運營的資訊平台，不隸屬於、不代表、也未獲得任何 AI
            公司（包括但不限於 OpenAI、Anthropic、Google、Microsoft、Midjourney
            等）的官方授權或背書。所有產品名稱、商標及標誌均為各公司所有。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            5. 評測與評分
          </h2>
          <p>
            本站所提供的評分與評測內容基於公開資訊與使用者體驗彙整，僅代表本站觀點，不代表任何官方評價。評分可能會隨時間更新調整。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            6. 責任限制
          </h2>
          <p>
            本站盡力確保資訊的正確性與即時性，但不保證所有內容完全準確或最新。對於因使用本站資訊所造成的任何直接或間接損失，本站不承擔任何責任。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            7. 條款修改
          </h2>
          <p>
            本站保留隨時修改使用條款之權利。修改後的條款將在本頁面公布，繼續使用本站即表示您同意修改後的條款。
          </p>
        </section>

        <p className="pt-4 text-xs text-[var(--muted-light)]">
          最後更新日期：2026 年 3 月 22 日
        </p>
      </div>
    </div>
  );
}
