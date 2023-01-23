import Import from "@/components/Import";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return <Import lng={lng}></Import>;
}
