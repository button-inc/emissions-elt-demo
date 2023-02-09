import { Suspense } from "react";
import { gql } from "graphql-request";
import { useTranslation } from "@/i18n";
import DataTableSVG from "@/components/loading/DataTableSVG";
import DataSetQuery from "@/components/query/DataSetQuery";
import Tag from "@/components/layout/Tag";
import { columnsDatasetConnection } from "@/lib/table/columns";
import { crumbsDatasetConnection } from "@/lib/navigation/crumbs";

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

export default async function Page({ lng, endpoint }) {
  // 👇️ language management
  const { t } = await useTranslation(lng, "tag");
  // 👇️ translate titles
  columnsDatasetConnection.map((item) => {
    item.label = t(item.label);
  });
  crumbsDatasetConnection.map((item) => {
    item.title = t(item.title);
  });

  // 👉️ RETURN: table with query data
  return (
    <>
      <Tag
        tag={t("dataset.connection.tag")}
        crumbs={crumbsDatasetConnection}
      ></Tag>
      <Suspense fallback={<DataTableSVG />}>
        {/* @ts-expect-error Async Server Component */}
        <DataSetQuery
          endpoint={endpoint}
          query={query}
          columns={columnsDatasetConnection}
        ></DataSetQuery>
      </Suspense>
    </>
  );
}
