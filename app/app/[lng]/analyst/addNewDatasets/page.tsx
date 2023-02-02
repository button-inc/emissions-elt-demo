import AddNewDatasetsTable from "@/components/AddNewDatasetsTable";
import PageLink from "@/components/navigation/PageLink";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const endpoint = "api/analyst/graphql";

  const options = [
    { title: "Add", href: "upload" },
    { title: "Upload", href: "upload" },
  ];

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AddNewDatasetsTable lng={lng} endpoint={endpoint}></AddNewDatasetsTable>
      <div>
        <PageLink options={options}></PageLink>
      </div>
    </>
  );
}
