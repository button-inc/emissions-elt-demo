import { getQueryData } from "@/lib/utilities/helpers";
import ConnectionContainer from "@/components/route/dataset/connection/Container";

// 👇️ async query for dataset\connection to return client-side container
export default async function Page({ lng, endpoint, query, columns }) {
  const data = await getQueryData(endpoint, query);
  // 👉️ OK: return connection container
  return <ConnectionContainer lng={lng} rows={data} columns={columns} />;
}
