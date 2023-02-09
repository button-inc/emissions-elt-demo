import Insight from "@/components/route/Insight";
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
