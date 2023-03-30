import AnonymizedArea from "@/components/route/anonymized/id/Area";

export default function Page({ params }) {
  // 👇️ graphQL query endpoint for this role
  const endpoint = "api/analyst/graphql";

  console.log("params");
  console.log(params);
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AnonymizedArea
        lng={params.lng}
        id={params.id}
        endpoint={endpoint}
      ></AnonymizedArea>
    </>
  );
}
