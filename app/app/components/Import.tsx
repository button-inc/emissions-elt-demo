"use client";
import { useTranslation } from "@/i18n/client";
import DashBoard from "@/components/navigation/Dashboard";

export default function Import({ lng }) {
  // 👇️ language management, client side
  const { t } = useTranslation(lng, "import");
  const options = [{ title: t("upload"), href: "upload" }];

  return (
    <>
      <h1> {t("message")}</h1>
      <DashBoard options={options}></DashBoard>
    </>
  );
}
