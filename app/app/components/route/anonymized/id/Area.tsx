import { Suspense } from "react";
import { gql } from "graphql-request";
import { useTranslation } from "@/i18n";
import DataTableSVG from "@/components/loading/DataTableSVG";
import DataTableQuery from "@/components/query/DataTableQuery";
import Tag from "@/components/layout/Tag";
import { columnsAnonymizedArea } from "@/lib/table/columns";
import { crumbsAnonymizedArea } from "@/lib/navigation/crumbs";

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
  // 👇️ language management
  const { t } = await useTranslation(lng, "shared");
  // 👇️ translate titles
  columnsAnonymizedArea.map((item) => {
    item.label = t(item.label);
  });
  crumbsAnonymizedArea.map((item) => {
    item.title = t(item.title);
  });
  // 👉️ RETURN: table with query data
  return (
    <>
      <Tag
        tag={t("anonymized.dataset.tag")}
        crumbs={crumbsAnonymizedArea}
      ></Tag>
      <Suspense fallback={<DataTableSVG />}>
        {/* @ts-expect-error Async Server Component */}
        <DataTableQuery
          endpoint={endpoint}
          query={query}
          columns={columnsAnonymizedArea}
        ></DataTableQuery>
      </Suspense>
    </>
  );
}
