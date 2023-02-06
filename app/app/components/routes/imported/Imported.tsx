import { Suspense } from "react";
import { gql } from "graphql-request";
import { useTranslation } from "@/i18n";
import DataTableSVG from "@/components/loading/DataTableSVG";
import DataTableQuery from "@/components/query/DataTableQuery";
import Tag from "@/components/layout/Tag";
import { columnsImported } from "@/lib/table/columns";
import { crumbsImported } from "@/lib/navigation/crumbs";

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

// 🔥 workaround for error when trying to pass options as props with functions
// ❌ "functions cannot be passed directly to client components because they're not serializable"
// 👇️ used to changes options for @/components/table/DataTable
const cntx = "imported";

export default async function Page({ lng, endpoint }) {
  // 👇️ language management
  const { t } = await useTranslation(lng, "tag");
  // 👇️ translate titles
  columnsImported.map((item) => {
    item.label = t(item.label);
  });
  crumbsImported.map((item) => {
    item.title = t(item.title);
  });

  // 👉️ RETURN: table with query data
  return (
    <>
      <Tag tag={t("imported.datasets.tag")} crumbs={crumbsImported}></Tag>
      <Suspense fallback={<DataTableSVG />}>
        {/* @ts-expect-error Async Server Component */}
        <DataTableQuery
          endpoint={endpoint}
          query={query}
          columns={columnsImported}
          cntx={cntx}
        ></DataTableQuery>
      </Suspense>
    </>
  );
}
