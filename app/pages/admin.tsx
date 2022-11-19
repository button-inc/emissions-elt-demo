import { Button } from "@button-inc/button-theme";
import Link from "next/link";

export default function Admin() {
  // TODO(JG): Add links to actual pages once created
  const adminOptions = [
    { title: "Add a New Dataset", link: "#" },
    { title: "View Imported Datasets", link: "#" },
    { title: "Data Insights (Metabase)", link: "#" },
  ];
  return (
    <>
      {/* TODO(JG): Wrap in default layout */}
      {adminOptions.map((option) => (
        <Link href={option.link} key={option.title}>
          <Button size="large" variant="secondary">
            {option.title}
          </Button>
        </Link>
      ))}
    </>
  );
}
