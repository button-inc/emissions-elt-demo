import { Suspense } from "react";
import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { gql } from "graphql-request";
import { Spinner } from "@/components/layout/Spinner";
import { IColumnType } from "@/components/table/Table";
import TableQuery from "@/components/table/TableQuery";

// 👇️ graphQL query
const endpoint = "api/analyst/graphql";

// 👇️ data definition of imported data
interface IData {
  originAreaId: number;
  destinationAreaId: number;
  voyageCount: number;
}

// 👇️ column definition of imported data
const columns: IColumnType<IData>[] = [
  {
    key: "originAreaId",
    title: "0",
    width: 200,
  },
  {
    key: "destinationAreaId",
    title: "1",
    width: 200,
  },
  {
    key: "voyageCount",
    title: "2",
    width: 200,
  },
];

const query = gql`
  {
    allInsightsVoyages {
      nodes {
        originAreaId
        destinationAreaId
        voyageCount
      }
    }
  }
`;
export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "analytic");
  // 👇️ translate column titles
  columns.map((column, index) => {
    column.title = t("column" + index.toString());
  });

  // 👉️ return: table with query data
  return (
    <>
      <div>
        <h1>{t("message")}</h1>
        <Suspense fallback={<Spinner />}>
          {/* @ts-expect-error Async Server Component */}
          <TableQuery
            endpoint={endpoint}
            query={query}
            columns={columns}
          ></TableQuery>
        </Suspense>
      </div>
    </>
  );
}
