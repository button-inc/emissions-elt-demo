import Imported from "@/components/route/imported/Imported";
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
      <Imported lng={lng} endpoint={endpoint}></Imported>
    </>
  );
}
