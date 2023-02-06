import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@/i18n/settings";
import { getToken } from "next-auth/jwt";

/* 📌
Middleware allows you to run code before a request is completed so you can modify the response by
rewriting, redirecting, modifying the request or response headers, or responding directly.
*/
/*
Middleware will be invoked for every route in your project. The following is the execution order:
headers from next.config.js
redirects from next.config.js
Middleware (rewrites, redirects, etc.)
beforeFiles (rewrites) from next.config.js
Filesystem routes (public/, _next/static/, Pages, etc.)
afterFiles (rewrites) from next.config.js
Dynamic Routes (/blog/[slug])
fallback (rewrites) from next.config.js
*/

/*👇️
There are two ways to define which paths Middleware will run on:
Custom matcher config
Conditional statements
*/
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(req: NextRequest) {
  // 👇️ vars for route management
  const { pathname } = req.nextUrl;
  const isRouteAuth = pathname.indexOf("auth") > -1;
  const isRouteGraphQL = pathname.indexOf("api/graph") > -1;
  const isRouteAPI = pathname.indexOf("/api/") > -1;
  // 👇️ vars for user session details via next-auth getToken to decrypt jwt in request cookie
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // 👇️ authenticated user"s jwt role property (set from DB permission table in api/auth/nextauth)
  const role = session?.role;
  // 👇️ vars for app language management
  acceptLanguage.languages(languages);
  const cookieName = "i18next";
  let lng: string;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // 👇️ route management- allow calls to /auth for authentication
  if (isRouteAuth === true) {
    // 👉️ OK: route all /auth/* routes
    return NextResponse.next();
  }

  // 👇️ route management- gate access users only authenticated by oAuth and authorized by DB permissions table
  if (session && role) {
    // 👉️ OK: authenticated and authorized

    // 👇️ route management- calls to graphql
    if (process.env.ENVIRONMENT !== "production") {
      // 👀 dev only
      if (isRouteGraphQL === true) {
        // 👉️ OK: route all /auth/* routes
        return NextResponse.next();
      }
    }

    // 👇️ inspect pathname routes
    const routes = pathname.split("/");

    // 👇️ routes with JUST a language param (ex: /en) need to be routed to user"s home page- based on user"s role
    if (routes.length - 1 === 1) {
      // 👉️ route to user role home
      return NextResponse.redirect(new URL(`/${lng}/${role}/home`, req.url));
    }

    // 👇️ validate routes matches jwt authenticated user role property
    if (!routes.includes(role.toString())) {
      // ⛔️ Denied: request is not authorized for the requested route
      if (isRouteAPI === true) {
        return NextResponse.redirect(
          new URL("/api/auth/unauthorized", req.url)
        );
      }
      return NextResponse.redirect(new URL(`/${lng}/unauthorized`, req.url));
    }
    // 👇️ route API requests withOUT language param
    if (isRouteAPI === true) {
      return NextResponse.next();
    }
    // 👇️ routes with language param
    if (!languages.some((loc) => pathname.startsWith(`/${loc}`))) {
      // ⛔️ Re-route with language path
      return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
    }
    if (req.headers.has("referer")) {
      // 👉️ called from oAuth provider
      const refererUrl = new URL(req.headers.get("referer"));
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }
    // 👉️ OK: route request
    return NextResponse.next();
  } else {
    // ⛔️ Denied: request is not authorized - route to auth login
    if (isRouteAPI === true) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    } else {
      return NextResponse.redirect(new URL(`/${lng}/auth/signin`, req.url));
    }
  }
}
