"use client";
import {
  BaseProvider,
  ButtonLink,
  Spacer,
  Typography,
} from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
export default function Page({ options, position }) {
  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        {position === "right" && (
          <>
            <Typography>
              <Spacer space={9} />
              <Spacer space={11} direction="row" />
            </Typography>
          </>
        )}
        {options.map((option, index) => (
          <ButtonLink key={index} href={option.href}>
            {option.tag}
          </ButtonLink>
        ))}
      </BaseProvider>
    </>
  );
}
