"use client";
import { useTranslation } from "@/i18n/client";
import Link from "next/link";
import { Button, Grid } from "@button-inc/button-theme";

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ language management, client side
  const { t } = useTranslation(lng, "home");
  // 👇️ link management

  const context = "dropper";
  const options = [
    { title: t("dashboard"), link: context + "/dashboard" },
    { title: t("profile"), link: context + "/profile" },
    { title: t("help"), link: context + "/help" },
    { title: t("logout"), link: "/api/auth/signout" },
  ];
  return (
    <>
      <Grid style={{ padding: "2rem" }}>
        <Grid.Row justify="space-around" align="center">
          {options.map((option) => (
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
