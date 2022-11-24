import { Button, Grid } from "@button-inc/button-theme";
import Link from "next/link";
import DefaultLayout from "components/DefaultLayout";

export default function Admin() {
  // TODO(JG): Add links to actual pages once created
  const adminOptions = [
    { title: "Add a New Dataset", link: "#" },
    { title: "View Imported Datasets", link: "#" },
    { title: "Data Insights (Metabase)", link: "#" },
  ];
  return (
    <>
      <DefaultLayout>
        <Grid style={{ padding: "2rem" }}>
          <Grid.Row justify="space-around" align="center">
          {adminOptions.map((option) => (
            <Grid.Col key={option.title} span="4">
              <Link href={option.link}>
                <Button 
                  size="large" 
                  variant="secondary" 
                  style={{ width: "100%" }}
                >
                  {option.title}
                </Button>
              </Link>
            </Grid.Col>
          ))}
          </Grid.Row>
        </Grid>
      </DefaultLayout>
    </>
  );
}
