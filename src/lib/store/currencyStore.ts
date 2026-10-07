import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CurrencyCode = "USD" | "CHF" | "EUR" | "GBP" | "JPY";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstUSD: number;
  label: string;
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rateAgainstUSD: 1.0, label: "USD ($)" },
  CHF: { code: "CHF", symbol: "CHF ", rateAgainstUSD: 0.88, label: "CHF (Swiss Franc)" },
  EUR: { code: "EUR", symbol: "€", rateAgainstUSD: 0.92, label: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rateAgainstUSD: 0.78, label: "GBP (£)" },
  JPY: { code: "JPY", symbol: "¥", rateAgainstUSD: 152.0, label: "JPY (¥)" },
};

interface CurrencyStoreState {
  currentCurrency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
}

export const useCurrencyStore = create<CurrencyStoreState>()(
  persist(
    (set, get) => ({
      currentCurrency: "USD",
      setCurrency: (code: CurrencyCode) => set({ currentCurrency: code }),
      formatPrice: (amountInUSD: number) => {
        const curr = get().currentCurrency;
        const config = CURRENCY_CONFIGS[curr] || CURRENCY_CONFIGS.USD;
        const converted = Math.round(amountInUSD * config.rateAgainstUSD);
        
        if (curr === "JPY") {
          return `¥${converted.toLocaleString("en-US")}`;
        }
        if (curr === "CHF") {
          return `CHF ${converted.toLocaleString("en-US")}`;
        }
        if (curr === "EUR") {
          return `€${converted.toLocaleString("en-US")}`;
        }
        if (curr === "GBP") {
          return `£${converted.toLocaleString("en-US")}`;
        }
        return `$${converted.toLocaleString("en-US")} USD`;
      },
    }),
    {
      name: "oscilla-currency-pref",
    }
  )
);
