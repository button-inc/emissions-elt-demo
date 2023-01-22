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
  const context = "manager";
  const options = [{ title: t("view"), link: context + "/imported" }];

  const name = session && session?.user ? session?.user.name.split(" ")[0] : "";
  const label = t("label") + ", " + name + "!";
  return (
    <>
      <BoxLabel text={label}></BoxLabel>
      <DashBoard options={options}></DashBoard>
    </>
  );
}
