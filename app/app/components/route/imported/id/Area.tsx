import { Suspense } from "react";
import { gql } from "graphql-request";
import { useTranslation } from "@/i18n";
import DataTableSVG from "@/components/loading/DataTableSVG";
import DataTableQuery from "@/components/query/DataTableQuery";
import Tag from "@/components/layout/Tag";
import { columnsImportedArea } from "@/lib/table/columns";
import { crumbsImportedArea } from "@/lib/navigation/crumbs";

// 👇️ used to changes options for @/components/table/DataTable
const cntx = "dlpAnalysis";

export default async function Page({ lng, id, endpoint }) {
  // 👇️ graphQL query
  const query = gql`
  {
    dlpTableColumns(filter: { jobId: { equalTo: "${id}" } }) {
      nodes {
        columnAnalysis {
          columnTitle
          identifiedInfoType
          maxLikelihood
          toAnonymize
          quotes
        }
        jobId
      }
    }
  }
`;
  // 👇️ language management
  const { t } = await useTranslation(lng, "tag");
  // 👇️ translate titles
  columnsImportedArea.map((item) => {
    item.label = t(item.label);
  });
  crumbsImportedArea.map((item) => {
    item.title = t(item.title);
  });
  // 👉️ RETURN: table with query data
  return (
    <>
      <Tag tag={t("imported.dataset.tag")} crumbs={crumbsImportedArea}></Tag>
      <Suspense fallback={<DataTableSVG />}>
        {/* @ts-expect-error Async Server Component */}
        <DataTableQuery
          endpoint={endpoint}
          query={query}
          columns={columnsImportedArea}
          cntx={cntx}
        ></DataTableQuery>
      </Suspense>
    </>
  );
}
