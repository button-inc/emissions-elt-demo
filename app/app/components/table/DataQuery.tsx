import { request } from "graphql-request";
import { cookies } from "next/headers";
import DataTable from "./DataTable";
// 👇️ graphql-request to api endpoint
async function getData(endpoint, query) {
  // 👇️ vars for graphql-request
  endpoint = process.env.API_HOST + endpoint;
  const variables = null;
  // 📌 IMPORTANT: add the browser session cookie with the encrypted JWT to this server side API request- to be used by middleware for route protection
  const headers = {
    Cookie:
      "next-auth.session-token=" +
      cookies().get("next-auth.session-token")?.value,
  };
  const data = await request(endpoint, query, variables, headers);
  // 👉️ OK: return data
  return data[Object.keys(data)[0]].nodes;
}

export default async function Query({ endpoint, query, columns }) {
  // 👇️ data fetching, server side
  const data = await getData(endpoint, query);
  // 👉️ OK: return dynamic table
  return <DataTable rows={data} columns={columns} />;
}
