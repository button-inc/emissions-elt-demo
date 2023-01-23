"use client";
import { useTranslation } from "@/i18n/client";
import BoxLabel from "@/components/layout/BoxLabel";
import DashBoard from "@/components/navigation/Dashboard";
import { useSession } from "next-auth/react";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { data: session } = useSession();
  // 👇️ language management, client side
  const { t } = useTranslation(lng, "dashboard");
  // 👇️ link management with translations
  const options = [
    { title: t("import"), href: "import" },
    { title: t("imported"), href: "imported" },
    { title: t("anon"), href: "anonymize" },
    { title: t("analytic"), href: "analytic" },
    { title: t("insight"), href: "insight" },
  ];

  const name = session && session?.user ? session?.user.name.split(" ")[0] : "";
  const label = t("label") + ", " + name + "!";
  return (
    <>
      <BoxLabel text={label}></BoxLabel>
      <DashBoard options={options}></DashBoard>
    </>
  );
}
