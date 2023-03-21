import Add from "@/components/route/dataset/Add";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return <Add lng={lng}></Add>;
}
