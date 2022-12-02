import { Button, Grid } from "@button-inc/button-theme";
import Link from "next/link";
import DefaultLayout from "components/DefaultLayout";

export default function Insights() {
  const insightsOptions = [{ title: "Datasets", link: "#" }];
  return (
    <>
      <DefaultLayout>
        <Grid style={{ padding: "2rem" }}>
          <Grid.Row justify="space-around" align="center">
            {insightsOptions.map((option) => (
              <Grid.Col key={option.title} span="30">
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
