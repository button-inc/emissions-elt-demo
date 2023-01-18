"use client";
import { Header } from "@button-inc/button-theme";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function DefaultLayout({ children }) {
  return (
    <div className="page-container">
      <Header />
      <main className="content--vertical-center">
        {
          //👇️ Wrapping the SessionProvider obtained from next-auth so to have access to client side information in both client and server pages */
        }
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
