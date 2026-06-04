"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  type Locale,
  type TranslationKey,
} from "./translations";

const STORAGE_KEY = "kd-lang";

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function translate(
  lang: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>,
) {
  const dict = translations[lang] ?? translations.en;
  let value: string =
    (dict as Record<string, string>)[key] ??
    (translations.en as Record<string, string>)[key] ??
    key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(`{${k}}`, String(v));
    }
  }
  return value;
}

export function LanguageProvider({
  children,
  initial = "en",
}: {
  children: ReactNode;
  initial?: Locale;
}) {
  const [lang, setLangState] = useState<Locale>(initial);

  // Hydrate from localStorage / browser preference on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "th") {
        setLangState(stored);
        return;
      }
      const nav = window.navigator.language?.toLowerCase() ?? "";
      if (nav.startsWith("th")) setLangState("th");
    } catch {
      /* localStorage unavailable — fine, stay on default */
    }
  }, []);

  // Keep <html lang> in sync for accessibility + SEO
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Locale) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Safe accessor — when no provider is mounted (e.g. on the public Coming Soon
 * route), falls back to English without throwing. This lets shared components
 * like Nav/Footer use t() everywhere.
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (ctx) return ctx;
  return {
    lang: "en",
    setLang: () => {},
    t: (key, vars) => translate("en", key, vars),
  };
}
