import { Button, Grid } from "@button-inc/button-theme";
import Link from "next/link";
import DefaultLayout from "components/DefaultLayout";

export default function View() {
  // TODO(JG): Add links to actual pages once created
  const viewOptions = [
    { title: "View Data", link: "#" },
    { title: "Rerun", link: "#" },
  ];
  return (
    <>
      <DefaultLayout>
        <Grid style={{ padding: "2rem" }}>
          <Grid.Row justify="space-around" align="center">
            {viewOptions.map((option) => (
              <Grid.Col key={option.title} span="430">
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
