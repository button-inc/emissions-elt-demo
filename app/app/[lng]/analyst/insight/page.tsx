import Insight from "@/components/Insight";

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return (
    <>
      <Insight lng={lng}></Insight>
    </>
  );
}
