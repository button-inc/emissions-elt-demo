"use client";
import DataTableConfig from "@/components/DataTableConfig";
import { useSearchParams } from "next/navigation";

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return <DataTableConfig lng={lng} name={name}></DataTableConfig>;
}
