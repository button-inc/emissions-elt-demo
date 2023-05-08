import { Suspense } from "react";
import { gql } from "graphql-request";
import { useTranslation } from "@/i18n";
import Spinner from "@/components/loading/Spinner";
import DataTableQuery from "@/components/query/DataTableQuery";
import Tag from "@/components/layout/Tag";
import { columnsAnonymized } from "@/lib/table/columns";
import { crumbsAnonymized } from "@/lib/navigation/crumbs";

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
const cntx = "anonymized";

export default async function Page({ lng, endpoint }) {
  // 👇️ language management
  const { t } = await useTranslation(lng, "tag");
  // 👇️ translate titles
  columnsAnonymized.map((item) => {
    item.label = t(item.label);
  });
  crumbsAnonymized.map((item) => {
    item.title = t(item.title);
  });
  // 👉️ RETURN: table with query data
  return (
    <>
      <Tag tag={t("anonymized.datasets.tag")} crumbs={crumbsAnonymized}></Tag>
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error Async Server Component */}
        <DataTableQuery
          lng={lng}
          endpoint={endpoint}
          query={query}
          columns={columnsAnonymized}
          cntx={cntx}
        ></DataTableQuery>
      </Suspense>
    </>
  );
}
