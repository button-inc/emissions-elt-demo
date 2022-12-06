import { Button, Grid } from "@button-inc/button-theme";
import Link from "next/link";

export default function Home() {
  const homeOptions = [
    { title: "Dashboard", link: "admin" }, // Dashboard is called admin
    { title: "Profile", link: "#" },
    { title: "Log out", link: "login" },
  ];
  return (
    <>
      <Grid style={{ padding: "2rem" }}>
        <Grid.Row justify="space-around" align="center">
          {homeOptions.map((option) => (
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
    </>
  );
}
