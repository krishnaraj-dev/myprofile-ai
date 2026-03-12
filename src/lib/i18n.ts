export type Locale = "en" | "ta";

export const SUPPORTED_LOCALES: Locale[] = ["en", "ta"];
export const DEFAULT_LOCALE: Locale = "en";

const messages: Record<Locale, Record<string, string>> = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.articles": "Articles",
    "nav.experience": "Experience",
    "nav.career": "Career Path",
    "nav.contact": "Contact",
  },
  ta: {
    "nav.about": "பற்றி",
    "nav.skills": "திறன்கள்",
    "nav.projects": "திட்டங்கள்",
    "nav.articles": "கட்டுரைகள்",
    "nav.experience": "அனுபவம்",
    "nav.career": "தொழில் பாதை",
    "nav.contact": "தொடர்பு",
  },
};

export const isSupportedLocale = (value: string): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale);

export const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const url = new URL(window.location.href);
  const queryLocale = url.searchParams.get("lang");
  if (queryLocale && isSupportedLocale(queryLocale)) {
    return queryLocale;
  }

  const pathLocale = url.pathname.split("/")[1];
  if (pathLocale && isSupportedLocale(pathLocale)) {
    return pathLocale;
  }

  const stored = window.localStorage.getItem("locale");
  if (stored && isSupportedLocale(stored)) {
    return stored;
  }

  const browserLocale = window.navigator.language.split("-")[0];
  if (browserLocale && isSupportedLocale(browserLocale)) {
    return browserLocale;
  }

  return DEFAULT_LOCALE;
};

export const translate = (locale: Locale, key: string): string =>
  messages[locale]?.[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
