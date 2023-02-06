import { getQueryData } from "@/lib/utilities/helpers";
import ConnectionContainer from "@/components/routes/dataset/connection/Container";

export default async function Query({ endpoint, query, columns }) {
  // 👇️ data fetching, server side
  const data = await getQueryData(endpoint, query);

  // 👉️ OK: return table with dynamic data/columns
  return <ConnectionContainer rows={data} columns={columns} />;
}
