import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import Tag from "@/components/layout/Tag";

export default async function Page({ lng }) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "help");

  return (
    <>
      <Tag text={t("label")}></Tag>
    </>
  );
}
