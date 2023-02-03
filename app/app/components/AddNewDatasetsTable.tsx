import { Suspense } from "react";
import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { gql } from "graphql-request";
import DataTableSVG from "@/components/loading/DataTableSVG";
import BoxLabel from "@/components/layout/BoxLabel";
import DataQueryWithEdit from "@/components/table/DataQueryWithEdit";

// 👇️ graphQL query
const query = gql`
  {
    importRecords {
      nodes {
        jobId
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
  //{ name: "jobId", options: { display: false } },
  { label: "0", name: "fileName" },
  { label: "1", name: "nickname" },
  { label: "2", name: "submissionDate" },
  { label: "3", name: "email" },
];
export default async function Page({ lng, endpoint }) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "addNewDatasets");
  // 👇️ translate column titles
  columns.map((column, index) => {
    if (column.label) {
      column.label = t("column" + index.toString());
    }
  });

  // 👉️ RETURN: table with query data
  return (
    <>
      <div>
        <BoxLabel text={t("label")}></BoxLabel>
        <Suspense fallback={<DataTableSVG />}>
          {/* @ts-expect-error Async Server Component */}
          <DataQueryWithEdit
            endpoint={endpoint}
            query={query}
            columns={columns}
          ></DataQueryWithEdit>
        </Suspense>
      </div>
    </>
  );
}
