import Help from "@/components/Help";
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
      <Help lng={lng}></Help>
    </>
  );
}
