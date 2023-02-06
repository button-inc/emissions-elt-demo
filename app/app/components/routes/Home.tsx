"use client";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/i18n/client";
import Tag from "@/components/layout/Tag";
import { crumbsHome } from "@/lib/navigation/crumbs";
import {
  BaseProvider,
  Box,
  ButtonLink,
  Card,
  Spacer,
  Typography,
} from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
export default function Page({ lng, options }) {
  // 👇️ language management
  let { t } = useTranslation(lng, "home");

  // 👇️ translate titles
  options.map((item) => {
    item.button = t(item.button);
    item.content = t(item.content);
    item.title = t(item.title);
  });
  crumbsHome.map((item) => {
    item.title = t(item.title);
  });

  // 👇️ user's next-auth session info
  const { data: session } = useSession();
  const name = session && session?.user ? session?.user.name.split(" ")[0] : "";
  const tag = t("tag") + ", " + name + "!";
  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        <Tag tag={tag} crumbs={crumbsHome}></Tag>
        <div className="content">
          <div className="container">
            {options.map((option, index) => (
              <>
                <div className="card" key={index}>
                  <Card>
                    <Box>
                      <Typography block variant={{ size: "h2" }}>
                        {option.title}
                      </Typography>
                      <Spacer space={2} />
                      <Box>
                        <Typography>{option.content}</Typography>
                        <Box top={4}>
                          <ButtonLink href={option.href}>
                            {option.button}
                          </ButtonLink>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </div>
              </>
            ))}
          </div>
        </div>
      </BaseProvider>
      <style jsx>
        {`
          .content {
            margin-top: 10px;
          }

          div .container {
            width: 75%;
          }
          .card {
            display: inline-block;
            width: 300px;
            height: 400px;
            margin-left: 50px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
