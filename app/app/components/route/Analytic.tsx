"use client";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsAnalytic } from "@/lib/navigation/crumbs";
export default function Page({ lng }) {
  // 👇️ language management
  let { t } = useTranslation(lng, "shared");
  // 👇️ translate titles
  crumbsAnalytic.map((item) => {
    item.title = t(item.title);
  });

  return (
    <>
      <Tag tag={t("analytic.tag")} crumbs={crumbsAnalytic}></Tag>
      <iframe
        src="http://34.125.212.21:3000/public/dashboard/fdf8e976-1b80-44ad-ade5-5097444352db"
        style={{ overflow: "hidden", height: "100vh", width: "100%" }}
        width="100%"
        height="100%"
        // eslint-disable-next-line react/no-unknown-property
        allowTransparency
      ></iframe>
    </>
  );
}
