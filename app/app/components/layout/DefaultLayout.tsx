"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function DefaultLayout({ children }) {
  return (
    <>
      {
        //👇️ Wrapping the SessionProvider obtained from next-auth so to have access to client side information in both client and server pages */
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
