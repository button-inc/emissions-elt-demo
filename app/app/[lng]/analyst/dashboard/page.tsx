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
  const { t } = useTranslation(lng, "dashboard");
  // 👇️ link management
  const context = "analyst";
  const options = [
    { title: t("import"), link: context + "/import" },
    { title: t("imported"), link: context + "/imported" },
    { title: t("anon"), link: context + "/anonymize" },
    { title: t("analytic"), link: context + "/analytic" },
    { title: t("insight"), link: context + "/insight" },
    { title: t("back"), link: context + "/home" },
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
