import Analytic from "@/components/route/Analytic";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return (
    <>
      <Analytic lng={lng}></Analytic>
    </>
  );
}
