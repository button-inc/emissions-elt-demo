"use client";
import { useTranslation } from "@/i18n/client";

export default function Profile({ lng }) {
  // 👇️ language management, client side
  const { t } = useTranslation(lng, "profile");

  return (
    <>
      <h1> {t("message")}</h1>
    </>
  );
}
