import { Suspense } from "react";
import { gql } from "graphql-request";
import { useTranslation } from "@/i18n";
import DataTableSVG from "@/components/loading/DataTableSVG";
import DataTableQuery from "@/components/query/DataTableQuery";
import Tag from "@/components/layout/Tag";
import { columnsImportedArea } from "@/lib/table/columns";
import { crumbsImportedArea } from "@/lib/navigation/crumbs";
import ButtonLink from "@/components/button/Link";

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
  // 👇️ screen buttons
  const options = [
    {
      tag: "imported.dataset.buttons.anonymize.tag",
      href: "../anonymized",
    },
  ];
  // 👇️ language management
  const { t } = await useTranslation(lng, "tag");
  // 👇️ translate titles
  columnsImportedArea.map((item) => {
    item.label = t(item.label);
  });
  crumbsImportedArea.map((item) => {
    item.title = t(item.title);
  });
  options.map((item) => {
    item.tag = t(item.tag);
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
        ></DataTableQuery>
      </Suspense>
      <ButtonLink options={options} position="right" />
    </>
  );
}
