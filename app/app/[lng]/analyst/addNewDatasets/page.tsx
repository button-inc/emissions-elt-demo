import AddNewDatasetsTable from "@/components/AddNewDatasetsTable";
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
      <AddNewDatasetsTable lng={lng} endpoint={endpoint}></AddNewDatasetsTable>
    </>
  );
}
