"use client";

import { createContext, useContext, useMemo } from "react";
import { getContent, type Content } from "@/lib/content/site";
import { DEFAULTS, type SiteData } from "@/lib/cms/schema";
import {
  defaultLocale,
  localize,
  type Locale,
  type Localized,
} from "@/lib/i18n";

type Value = { locale: Locale; c: Content; data: SiteData };

const ContentContext = createContext<Value | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  value: Value;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

let fallback: Value | null = null;

export function useContent(): Value {
  const value = useContext(ContentContext);
  if (value) return value;
  fallback ??= {
    locale: defaultLocale,
    c: getContent(defaultLocale),
    data: {
      projects: DEFAULTS.projects,
      experience: DEFAULTS.experience,
      skills: DEFAULTS.skills,
    },
  };
  return fallback;
}

export function useLocalized<T>(data: T): Localized<T> {
  const { locale } = useContent();
  return useMemo(() => localize(data, locale), [data, locale]);
}
