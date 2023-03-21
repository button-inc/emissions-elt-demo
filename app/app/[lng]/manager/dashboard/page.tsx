"use client";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import DashBoard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import { managerRoutes } from "@/lib/navigation/routes";

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
  // 👇️ translate route titles
  managerRoutes.map((item) => {
    item.title = t(item.title);
  });

  const name = session && session?.user ? session?.user.name.split(" ")[0] : "";
  const label = t("label") + ", " + name + "!";
  return (
    <>
      <Tag tag={label}></Tag>
      <DashBoard options={managerRoutes}></DashBoard>
    </>
  );
}
