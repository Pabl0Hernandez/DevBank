import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "devbank-language";

const I18nContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "pt" || saved === "en") return saved;
  const browserLanguage = navigator.language?.toLowerCase() || "pt-br";
  return browserLanguage.startsWith("pt") ? "pt" : "en";
};

const CATEGORY_MAP = {
  Entretenimento: "Entertainment",
  Compras: "Shopping",
  Transporte: "Transport",
  Alimentacao: "Food",
  Alimentação: "Food",
  Utilidades: "Utilities",
  Saude: "Health",
  Saúde: "Health",
  Renda: "Income",
  Transacao: "Transaction",
  Transação: "Transaction",
};

const MONTH_MAP = {
  Jan: "Jan",
  Fev: "Feb",
  Mar: "Mar",
  Abr: "Apr",
  Mai: "May",
  Jun: "Jun",
  Jul: "Jul",
  Ago: "Aug",
  Set: "Sep",
  Out: "Oct",
  Nov: "Nov",
  Dez: "Dec",
};

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute(
      "lang",
      language === "pt" ? "pt-BR" : "en-US",
    );
  }, [language]);

  const value = useMemo(() => {
    const isPt = language === "pt";

    return {
      language,
      setLanguage,
      isPt,
      tr: (ptText, enText) => (isPt ? ptText : enText),
      formatCurrency: (valueNumber) =>
        Number(valueNumber || 0).toLocaleString(isPt ? "pt-BR" : "en-US", {
          style: "currency",
          currency: "BRL",
        }),
      formatDate: (valueDate) =>
        new Date(valueDate).toLocaleDateString(isPt ? "pt-BR" : "en-US"),
      translateCategory: (category) => {
        if (isPt) return category;
        return CATEGORY_MAP[category] || category;
      },
      translateMonth: (month) => {
        if (isPt) return month;
        return MONTH_MAP[month] || month;
      },
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
