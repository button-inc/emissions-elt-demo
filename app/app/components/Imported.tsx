import { useTranslation } from "@/i18n";
import BoxLabel from "@/components/layout/BoxLabel";
export default async function Import({ lng }) {
  // 👇️ language management, server side
  const { t } = await useTranslation(lng, "imported");

  return (
    <>
      <BoxLabel text={t("label")}></BoxLabel>
    </>
  );
}
