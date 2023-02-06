import Anonymized from "app/components/routes/anonymized/Anonymized";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ graphQL query endpoint
  const endpoint = "api/analyst/graphql";
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Anonymized lng={lng} endpoint={endpoint}></Anonymized>
    </>
  );
}
