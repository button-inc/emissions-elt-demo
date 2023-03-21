import { getQueryData } from "@/lib/utilities/helpers";
import DataTable from "@/components/table/DataTable";

export default async function Query({ lng, endpoint, query, columns, cntx }) {
  // 👇️ data fetching, server side
  const data = await getQueryData(endpoint, query);

  // 👉️ OK: return table with dynamic data/columns
  return <DataTable lng={lng} rows={data} columns={columns} cntx={cntx} />;
}
