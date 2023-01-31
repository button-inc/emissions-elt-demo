"use client";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

export default function DefaultLayout({ children }) {
  const Header = dynamic(() => import("@/components/layout/Header"), {
    suspense: true,
  });
  const Footer = dynamic(() => import("@/components/layout/Footer"), {
    suspense: true,
  });
  return (
    <>
      {
        //👇️ Wrapping the SessionProvider obtained from next-auth so to have access to client side information in both client and server pages. i.e: COOKIE */
      }
      <SessionProvider>
        <Header />
        <div className="page-container">{children}</div>
        <Footer />
      </SessionProvider>
      <style jsx>
        {`
          .page-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      </style>
    </>
  );
}
