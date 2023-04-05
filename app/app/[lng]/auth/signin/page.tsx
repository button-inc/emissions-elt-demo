import { getProviders } from "next-auth/react";
import Signin from "@/components/auth/Signin";

// 🖐️: NextJS needs to render this dynamically, as `getProviders` fetches against a live host
export const dynamic = "force-dynamic";

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
