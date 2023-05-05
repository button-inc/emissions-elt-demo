import DatasetAvailable from "@/components/route/dataset/Available";
export const dynamic = "force-dynamic";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const endpoint = "api/analyst/graphql";

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <DatasetAvailable lng={lng} endpoint={endpoint}></DatasetAvailable>
    </>
  );
}
