"use client";

import { useRouter } from "next/navigation";
import type { Currency } from "@/lib/currency";

const OPTIONS: { code: Currency; symbol: string }[] = [
  { code: "TRY", symbol: "₺" },
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
];
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year, matches middleware.ts

export default function CurrencySwitcher({ currency }: { currency: Currency }) {
  const router = useRouter();

  function selectCurrency(next: Currency) {
    if (next === currency) return;
    document.cookie = `vam_currency=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="vc-lang-switcher">
      {OPTIONS.map((opt, i) => (
        <span key={opt.code}>
          {i > 0 && <span className="vc-lang-switcher-sep">·</span>}
          <button
            type="button"
            className={`vc-lang-switcher-btn${opt.code === currency ? " active" : ""}`}
            onClick={() => selectCurrency(opt.code)}
            aria-current={opt.code === currency}
            aria-label={opt.code}
          >
            {opt.symbol}
          </button>
        </span>
      ))}
    </div>
  );
}
