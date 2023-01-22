import { Suspense } from "react";
import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { gql } from "graphql-request";
import BoxLabel from "@/components/layout/BoxLabel";
import { Spinner } from "@/components/layout/Spinner";
import DataQuery from "@/components/table/DataQuery";
import { GridColDef } from "@mui/x-data-grid";

// 👇️ graphQL query
const query = gql`
  {
    insightsVoyages {
      nodes {
        id
        originAreaId
        destinationAreaId
        voyageCount
      }
    }
  }
`;
// 👇️ graphQL query endpoint
const endpoint = "api/analyst/graphql";

// 👇️ DataTable column definition of query data
const columns: GridColDef[] = [
  {
    field: "id",
    width: 50,
  },
  {
    field: "originAreaId",
    headerName: "0",
    type: "number",
    width: 200,
  },
  {
    field: "destinationAreaId",
    headerName: "1",
    type: "number",
    width: 200,
  },
  {
    field: "voyageCount",
    headerName: "2",
    type: "number",
    width: 200,
  },
];
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
    if (column.headerName) {
      column.headerName = t("column" + index.toString());
    }
  });

  // 👉️ return: table with query data
  return (
    <>
      <div>
        <BoxLabel text={t("label")}></BoxLabel>
        <Suspense fallback={<Spinner />}>
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
