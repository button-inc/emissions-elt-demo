import { request } from "graphql-request";
import { cookies } from "next/headers";
import { flattenJSON } from "@/lib/utilities/helpers";
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
  // 👇️ data fetching via graphql-request
  const response = await request(endpoint, query, variables, headers);
  // 👇️ get the nodes of the first object from the response
  const nodes = response[Object.keys(response)[0]].nodes;
  // 👇️ flattens nested nodes
  const data = nodes.map((obj) => flattenJSON(obj));

  // 👉️ OK: return data
  return data;
}

export default async function Query({ endpoint, query, columns, cntx }) {
  // 👇️ data fetching, server side
  const data = await getData(endpoint, query);

  // 👉️ OK: return table with dynamic data/columns
  return <DataTable rows={data} columns={columns} cntx={cntx} />;
}
