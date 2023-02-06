import { createInstance, Namespace } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

//👇️ i18n with Next.js 13 app directory: https://locize.com/blog/next-13-app-dir-i18n/
const initI18next = async (lng: string, ns: string | string[]) => {
  /* ✋
  We're not using the i18next singleton here because during compilation everything seems to be executed in parallel.
 Creating a new instance on each useTranslation call will keep the translations consistent.
  */
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    //👇️18next-resources-to-backend transforms resources to an i18next backend for lazy loading
    .use(
      resourcesToBackend(
        (language, namespace) =>
          import(`./locales/${language}/${namespace}/page.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation<N extends Namespace>(lng: string, ns?: N) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );
  return {
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance,
  };
}
