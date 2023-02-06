import Upload from "@/components/routes/dataset/Upload";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return <Upload lng={lng}></Upload>;
}
