import { cookies } from "next/headers";
import { request } from "graphql-request";

/**
 * flatten a nested JSON object
 * @param {Object} object: the JSON object with nested JSON objects
 */
export const flattenJSON = (object) => {
  let simpleObj = {};
  for (let key in object) {
    const value = object[key];
    const type = typeof value;
    if (
      ["string", "boolean"].includes(type) ||
      (type === "number" && !isNaN(value))
    ) {
      simpleObj[key] = value;
    } else if (type === "object") {
      //recursive loop
      Object.assign(simpleObj, flattenJSON(value));
    }
  }
  return simpleObj;
};

/**
 *  graphql-request to api endpoint
 * @param {String} endpoint: API route
 * @param {String} query: postgraphile query
 */
export const getQueryData = async (endpoint, query) => {
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
};

/**
 * get Prop by path utility - an alternative to lodash.get
 * @param {Object} object
 * @param {String|Array} path
 * @param {*} defaultVal
 */
export const getPropByPath = (object, path, defaultValue) => {
  const myPath = Array.isArray(path) ? path : path.split(".");
  if (object && myPath.length)
    return getPropByPath(object[myPath.shift()], myPath, defaultValue);
  return object === undefined ? defaultValue : object;
};
