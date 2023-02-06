"use client";
import { useSession } from "next-auth/react";
import {
  BaseProvider,
  Box,
  Divider,
  StackView,
  Typography,
} from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
export default function Header() {
  // 👇️ session based UX management
  const { data: session } = useSession();

  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        <Box>
          <StackView direction={{ xs: "column", md: "row" }}>
            <Box flex={2} space={2}>
              <Typography variant={{ size: "h2" }}>ClimateTrax</Typography>
            </Box>
            <Box flex={0.25} space={2}>
              {session?.user && (
                <>
                  <Typography>
                    <span>{session.user.name}</span>
                    {session.user.image && (
                      <span
                        style={{
                          backgroundImage: `url('${session.user.image}')`,
                        }}
                        className="avatar"
                      />
                    )}
                  </Typography>
                </>
              )}
            </Box>
          </StackView>
          <Divider />
        </Box>
      </BaseProvider>
      <style jsx>
        {`
          .avatar {
            border-radius: 2rem;
            margin-top: 1rem;
            margin-left: 0.4rem;
            height: 2rem;
            width: 2rem;
            background-color: white;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>
    </>
  );
}
