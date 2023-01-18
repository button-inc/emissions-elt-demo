import { Suspense } from "react";
import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { columns, query } from "@/lib/interfaces/imported";
import Query from "@/components/table/TableQuery";

// 👇️ graphQL query
const endpoint = process.env.GRAPHQL_MANAGER;

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "imported");
  // 👇️ translate column titles
  columns.map((column, index) => {
    column.title = t("column" + index.toString());
  });
  return (
    <>
      <div>
        <h1>{t("message")}</h1>
        <Suspense fallback="...">
          {/* @ts-expect-error Async Server Component */}
          <Query endpoint={endpoint} query={query} columns={columns}></Query>
        </Suspense>
      </div>
    </>
  );
}
