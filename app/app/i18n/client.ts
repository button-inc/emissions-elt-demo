"use client";

import i18next, { Namespace, KeyPrefix } from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
  UseTranslationResponse,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions } from "./settings";

// 👇️ on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`./locales/${language}/${namespace}/page.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, //  👉️ detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  });

export function useTranslation<
  N extends Namespace,
  TKPrefix extends KeyPrefix<N> = undefined
>(
  lng: string,
  ns?: N | Readonly<N>,
  options?: UseTranslationOptions<TKPrefix>
): UseTranslationResponse<N, TKPrefix> {
  if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
  return useTranslationOrg(ns, options);
}
