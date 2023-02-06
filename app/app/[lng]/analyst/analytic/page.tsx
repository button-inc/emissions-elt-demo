import Analytic from "@/components/routes/Analytic";
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
