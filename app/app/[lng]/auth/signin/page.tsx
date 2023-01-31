import { getProviders } from "next-auth/react";
import Signin from "@/components/auth/Signin";
export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const providers = await getProviders();

  //👉️ RETURN: client side component
  return (
    <>
      <Signin lng={lng} providers={providers}></Signin>
    </>
  );
}
