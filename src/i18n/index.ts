import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en, { type Translations } from './en';
import zh from './zh';

export type Locale = 'en' | 'zh';

const messages: Record<Locale, Translations> = { en, zh };

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set({ locale: get().locale === 'en' ? 'zh' : 'en' }),
    }),
    { name: 'edu-app-locale' }
  )
);

// Helper: resolve a dot-separated key path from the translations object.
function getByPath(obj: unknown, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

/**
 * useI18n hook -- returns { t, locale, setLocale, toggleLocale, translations }
 *
 * t(key)              -- returns the translated string for the dot-path key
 * t(key, params)      -- interpolates {param} placeholders
 * translations        -- the raw translations object for the current locale
 */
export function useI18n() {
  const { locale, setLocale, toggleLocale } = useI18nStore();
  const translations = messages[locale];

  function t(key: string, params?: Record<string, string | number>): string {
    let value = getByPath(translations, key);
    if (typeof value !== 'string') return key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = (value as string).replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return value as string;
  }

  return { t, locale, setLocale, toggleLocale, translations };
}

// Non-hook accessor for use outside of React components (e.g., data modules).
export function getLocale(): Locale {
  return useI18nStore.getState().locale;
}

export function getTranslations(): Translations {
  return messages[useI18nStore.getState().locale];
}
