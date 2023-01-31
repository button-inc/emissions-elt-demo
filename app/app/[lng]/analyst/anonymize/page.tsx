import Anonymize from "@/components/Anonymize";
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
      <Anonymize lng={lng}></Anonymize>
    </>
  );
}
