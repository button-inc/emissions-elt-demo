"use client";

import BreadCrumbs from "@/components/navigation/BreadCrumbs";
export default function Page({ tag, crumbs }: { tag: any; crumbs?: any[] }) {
  return (
    <>
      <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 text-purple-800">
        {tag}
      </h4>
      <BreadCrumbs items={crumbs} />
    </>
  );
}
