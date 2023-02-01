"use client";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";

//👇️ Using styled-jsx in client components requires a registry and  v5.1.0. :https://beta.nextjs.org/docs/styling/css-in-js
export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // 👇️ Only create stylesheet once with lazy initial state x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });
  // 👇️ Used to wrap root layout.tsx
  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
}
