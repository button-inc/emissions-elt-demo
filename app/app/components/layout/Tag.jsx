"use client";
import Crumbs from "@/components/navigation/Crumbs";
import {
  BaseProvider,
  Spacer,
  StackView,
  Typography,
} from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
export default function Page({ tag, crumbs }) {
  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        <StackView space={0} direction="row">
          <Spacer space={6} direction="row" />
          <Crumbs crumbs={crumbs} />
        </StackView>
        <Spacer space={3} />
        <StackView space={0} direction="row">
          <Spacer space={6} direction="row" />
          <Typography variant={{ size: "h1" }} heading="h1">
            {tag}
          </Typography>
        </StackView>
      </BaseProvider>
    </>
  );
}
