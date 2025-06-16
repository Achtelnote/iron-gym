import { Locale, LocaleOption } from "@/types";

export function getActiveLocale() {
  if (typeof window === "undefined") {
    return "en" as Locale;
  }
  
  const locale = localStorage.getItem("locale") || "en";
  return locale as Locale;
}

export function setActiveLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
  }
}

export function getAvailableLocales(): LocaleOption[] {
  return [
    { label: "English", value: "en" },
    { label: "Arabic", value: "ar" },
  ];
}
