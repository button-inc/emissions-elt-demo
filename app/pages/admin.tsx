import { Button, Grid } from "@button-inc/button-theme";
import Link from "next/link";
import DefaultLayout from "components/DefaultLayout";

export default function Admin() {
  const adminOptions = [
    { title: "Add a New Dataset", link: "import" },
    { title: "View Imported Datasets", link: "view" },
    { title: "Data Insights (Metabase)", link: "insights" },
  ];
  return (
    <>
      <DefaultLayout>
        <Grid style={{ padding: "2rem" }}>
          <Grid.Row justify="space-around" align="center">
            {adminOptions.map((option) => (
              <Grid.Col key={option.title} span="120">
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
