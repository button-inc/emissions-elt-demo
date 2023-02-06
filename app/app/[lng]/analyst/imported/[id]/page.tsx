import ImportedArea from "@/components/routes/imported/id/Area";

// 👇️ graphQL query endpoint
const endpoint = "api/analyst/graphql";

export default function Page({ lng, params }) {
  return (
    <>
      <div>
        {/* @ts-expect-error Server Component */}
        <ImportedArea
          lng={lng}
          id={params.id}
          endpoint={endpoint}
        ></ImportedArea>
      </div>
    </>
  );
}
