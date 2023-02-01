import ImportedDetail from "@/components/ImportedDetail";

export default function Page({ lng, params }) {
  // 👇️ graphQL query endpoint
  const endpoint = "api/analyst/graphql";
  console.log(params.id);
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ImportedDetail
        lng={lng}
        id={params.id}
        endpoint={endpoint}
      ></ImportedDetail>
    </>
  );
}
