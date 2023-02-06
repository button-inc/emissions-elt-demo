import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import Tag from "@/components/layout/Tag";

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "analytic");

  // 👉️ return: table with query data
  return (
    <>
      <div>
        <Tag text={t("label")}></Tag>
        <iframe
          src="http://34.125.212.21:3000/public/dashboard/fdf8e976-1b80-44ad-ade5-5097444352db"
          frameBorder="0"
          style={{ overflow: "hidden", height: "100vh", width: "100%" }}
          width="100%"
          height="100%"
          // eslint-disable-next-line react/no-unknown-property
          allowTransparency
        ></iframe>
      </div>
    </>
  );
}
