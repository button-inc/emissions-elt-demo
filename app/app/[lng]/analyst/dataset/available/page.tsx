import DatasetAvailable from "@/components/routes/dataset/Available";

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
