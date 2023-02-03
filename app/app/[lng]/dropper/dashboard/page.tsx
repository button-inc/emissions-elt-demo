import { useTranslation } from "@/i18n/client";
import BoxLabel from "@/components/layout/BoxLabel";
import DashBoard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import { dropperRoutes } from "@/lib/navigation/routes";

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
  dropperRoutes.map((item) => {
    item.title = t(item.title);
  });

  const name = session && session?.user ? session?.user.name.split(" ")[0] : "";
  const label = t("label") + ", " + name + "!";
  return (
    <>
      <BoxLabel text={label}></BoxLabel>
      <DashBoard options={dropperRoutes}></DashBoard>
    </>
  );
}
