import { Suspense } from "react";
import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { gql } from "graphql-request";
import DataTableSVG from "@/components/loading/DataTableSVG";
import BoxLabel from "@/components/layout/BoxLabel";
import DataQuery from "@/components/table/DataQuery";

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
  { name: "jobId", options: { display: false } },
  { label: "0", name: "fileName" },
  { label: "1", name: "nickname" },
  { label: "2", name: "submissionDate" },
  { label: "3", name: "email" },
];
export default async function Page({ lng, endpoint }) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "anonymize");
  // 👇️ translate column titles
  columns.map((column) => {
    if (column.label) {
      column.label = t("column" + column.label.toString());
    }
  });
  // 🔥 workaround for error when trying to pass options as props with functions
  // ❌ "functions cannot be passed directly to client components because they're not serializable"
  // 👇️ used to changes options for @/components/table/DataTable
  const cntx = "anonymize";

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
            cntx={cntx}
          ></DataQuery>
        </Suspense>
      </div>
    </>
  );
}
