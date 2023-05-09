import Imported from "@/components/route/imported/Imported";
export const dynamic = "force-dynamic";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ graphQL query endpoint for this role
  const endpoint = "api/analyst/graphql";
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Imported lng={lng} endpoint={endpoint}></Imported>
    </>
  );
}
