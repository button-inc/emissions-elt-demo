"use client";
import { BaseProvider } from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
import { Breadcrumbs } from "@telus-uds/ds-allium";

export default function Crumbs({ crumbs = [] }) {
  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        {crumbs.length > 0 && (
          <Breadcrumbs>
            {crumbs.map((crumb, index) => {
              return (
                <Breadcrumbs.Item key={index} href={crumb.href}>
                  {crumb.title}
                </Breadcrumbs.Item>
              );
            })}
          </Breadcrumbs>
        )}
      </BaseProvider>
    </>
  );
}
