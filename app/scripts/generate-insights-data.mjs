import fs from "fs";
import { JSONSchemaFaker } from "json-schema-faker";
let rawDestinationSchema = fs.readFileSync(
  "./../jsonschema/destination-api.schema.json"
);

let destinationSchema = JSON.parse(rawDestinationSchema);

const apiFakeResponseCount = 500;

JSONSchemaFaker.option("minItems", apiFakeResponseCount);
JSONSchemaFaker.option("fillProperties", false);

const res = JSONSchemaFaker.generate(destinationSchema);

const stringified = JSON.stringify(res);
fs.writeFileSync(
  "./generated/sample-insights-destination-output.json",
  stringified
);
