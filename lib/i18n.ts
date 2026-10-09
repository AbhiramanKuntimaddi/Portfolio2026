export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "lang";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

export type Text = Record<Locale, string>;

export type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { -readonly [K in keyof T]: Widen<T[K]> };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Localized<T> = T extends Text
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

export function isText(value: unknown): value is Text {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return false;
  const keys = Object.keys(value);
  return (
    keys.length === locales.length &&
    locales.every((l) => typeof (value as Text)[l] === "string")
  );
}

export function localize<T>(value: T, locale: Locale): Localized<T> {
  if (isText(value)) return value[locale] as Localized<T>;
  if (Array.isArray(value))
    return value.map((v) => localize(v, locale)) as Localized<T>;
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, locale)]),
    ) as Localized<T>;
  }
  return value as Localized<T>;
}
