import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import BoxLabel from "@/components/layout/BoxLabel";

export default async function Page({ lng }) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "help");

  return (
    <>
      <BoxLabel text={t("label")}></BoxLabel>
    </>
  );
}
