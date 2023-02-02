import ImportedID from "@/components/ImportedID";

export default function Page({ lng, params }) {
  // 👇️ graphQL query endpoint
  const endpoint = "api/analyst/graphql";

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ImportedID lng={lng} id={params.id} endpoint={endpoint}></ImportedID>
    </>
  );
}
