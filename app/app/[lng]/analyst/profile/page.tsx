import Profile from "@/components/Profile";
export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return <Profile lng={lng}></Profile>;
}
