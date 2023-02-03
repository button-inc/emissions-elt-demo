import { Suspense } from "react";
import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { gql } from "graphql-request";
import DataTableSVG from "@/components/loading/DataTableSVG";
import BoxLabel from "@/components/layout/BoxLabel";
import DataQuery from "@/components/table/DataQuery";

export default async function Page({ lng, id, endpoint }) {
  // 👇️ graphQL query
  const query =
    gql`
    {
      importRecords(condition: { jobId: ` +
    id +
    `}) {
        nodes {
          fileName
          submissionDate
          trackFormat {
            nickname
          }
          uploadedByUser {
            email
          }
        }
      }
    }
  `;
  // 👇️ DataTable column definition- reflecting data response
  const columns = [
    { label: "0", name: "fileName" },
    { label: "1", name: "nickname" },
    { label: "2", name: "submissionDate" },
    { label: "3", name: "email" },
  ];
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "anonymizeID");
  // 👇️ translate column titles
  columns.map((column) => {
    if (column.label) {
      column.label = t("column" + column.label.toString());
    }
  });
  // 👉️ RETURN: table with query data
  return (
    <>
      <div>
        <BoxLabel text={t("label")}></BoxLabel>
        <Suspense fallback={<DataTableSVG />}>
          {/* @ts-expect-error Async Server Component */}
          <DataQuery
            endpoint={endpoint}
            query={query}
            columns={columns}
          ></DataQuery>
        </Suspense>
      </div>
    </>
  );
}
