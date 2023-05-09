import DefaultLayout from "@/components/layout/DefaultLayout";

/*
📌 pre v13 pages/_app.js and pages/_document.js have been replaced with v13 app/layout.js root layout
Good to know:
The app directory must include a root layout.tsx
❗The root layout is a Server Component by default and can not be set to a Client Component.
The root layout must define <html> and <body> tags since Next.js does not automatically create them.
You can use the head.js special file to manage <head> HTML elements, for example, the <title> element.
*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent head.tsx.
        Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        {
          //👇️ DefaultLayout wraps client-side providers
        }
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
