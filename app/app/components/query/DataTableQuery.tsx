import { getQueryData } from "@/lib/utilities/helpers";
import DataTable from "@/components/table/DataTable";

export default async function Query({ endpoint, query, columns, cntx }) {
  // 👇️ data fetching, server side
  const data = await getQueryData(endpoint, query);

  // 👉️ OK: return table with dynamic data/columns
  return <DataTable rows={data} columns={columns} cntx={cntx} />;
}
