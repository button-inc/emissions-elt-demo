import DatasetConnection from "@/components/routes/dataset/connection/Connection";

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
      <DatasetConnection lng={lng} endpoint={endpoint}></DatasetConnection>
    </>
  );
}
