import Upload from "@/components/Upload";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return <Upload lng={lng}></Upload>;
}
