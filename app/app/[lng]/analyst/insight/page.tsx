import Insight from "@/components/routes/Insight";
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
