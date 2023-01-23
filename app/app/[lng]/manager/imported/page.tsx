import Imported from "@/components/Imported";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return <Imported lng={lng}></Imported>;
}
