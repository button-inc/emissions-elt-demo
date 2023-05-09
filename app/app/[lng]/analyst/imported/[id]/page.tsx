import ImportedArea from "@/components/route/imported/id/Area";
export const dynamic = "force-dynamic";

// 👇️ graphQL query endpoint for this role
const endpoint = "api/analyst/graphql";

export default function Page({ params }) {
  return (
    <>
      <div>
        {/* @ts-expect-error Server Component */}
        <ImportedArea
          lng={params.lng}
          id={params.id}
          endpoint={endpoint}
        ></ImportedArea>
      </div>
    </>
  );
}
