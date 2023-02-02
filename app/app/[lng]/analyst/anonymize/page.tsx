import Anonymize from "@/components/Anonymize";
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
      <Anonymize lng={lng} endpoint={endpoint}></Anonymize>
    </>
  );
}
