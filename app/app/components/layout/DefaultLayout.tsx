"use client";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import StyledJsxRegistry from "@/lib/utilities/registry";
import Header from "@/components/layout/Header";
export default function DefaultLayout({ children }) {
  return (
    <>
      {
        //👇️ wrap root layout with the registry for styled-jsx components (currently client side only)
      }
      <StyledJsxRegistry>
        {
          //👇️ Wrapping the next-auth SessionProvider to have access to client side information in both client and server pages. i.e: COOKIE */
        }
        <SessionProvider>
          <Header />
          <div>{children}</div>
        </SessionProvider>
      </StyledJsxRegistry>
    </>
  );
}
