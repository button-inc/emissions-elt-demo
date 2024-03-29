import Home from "@/components/route/Home";
import { routesAnalyst } from "@/lib/navigation/routes";

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return (
    <>
      <Home lng={lng} options={routesAnalyst}></Home>
    </>
  );
}
