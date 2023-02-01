import Imported from "@/components/Imported";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Imported lng={lng}></Imported>
    </>
  );
}
