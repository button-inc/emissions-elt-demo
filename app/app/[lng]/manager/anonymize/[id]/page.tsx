import AnonymizedArea from "@/components/route/anonymized/id/Area";

export default function Page({ lng, params }) {
  // 👇️ graphQL query endpoint
  const endpoint = "api/manager/graphql";

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AnonymizedArea
        lng={lng}
        id={params.id}
        endpoint={endpoint}
      ></AnonymizedArea>
    </>
  );
}
