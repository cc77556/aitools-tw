import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隱私政策",
  description: "AI 工具目錄網站隱私政策",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
        隱私政策
      </h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-[var(--muted)]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            1. 資料蒐集
          </h2>
          <p>
            本站不要求使用者註冊或提供個人資訊。我們可能透過分析工具（如 Google
            Analytics）蒐集匿名的網站使用數據，包括頁面瀏覽量、訪問時間、裝置類型等，以改善網站體驗。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            2. Cookie 使用
          </h2>
          <p>
            本站使用必要的 Cookie
            來儲存使用者偏好設定（如深色模式選擇）。分析用 Cookie
            僅在您同意後啟用。您可透過瀏覽器設定管理或刪除 Cookie。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            3. 第三方連結
          </h2>
          <p>
            本站包含通往第三方網站（各 AI
            工具官方網站）的連結。當您點擊這些連結離開本站後，您的隱私將受該第三方網站之隱私政策規範。本站不對第三方網站的隱私實務負責。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            4. 資料安全
          </h2>
          <p>
            本站採用 HTTPS
            加密傳輸，確保您與網站之間的連線安全。我們不儲存任何個人敏感資訊。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            5. 兒童隱私
          </h2>
          <p>
            本站不針對 13
            歲以下兒童提供服務，亦不會刻意蒐集兒童個人資訊。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            6. 政策變更
          </h2>
          <p>
            本站保留隨時修改隱私政策之權利。修改後的政策將在本頁面公布。建議您定期查閱本頁面以瞭解最新隱私政策。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
            7. 聯繫我們
          </h2>
          <p>
            如對本隱私政策有任何疑問，歡迎透過網站聯絡方式與我們聯繫。
          </p>
        </section>

        <p className="pt-4 text-xs text-[var(--muted-light)]">
          最後更新日期：2026 年 3 月 22 日
        </p>
      </div>
    </div>
  );
}
