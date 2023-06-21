This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) which was then upgraded to Next.js v 13 via the package.json file, and the experimental flag in the Next.config.js file:

```bash
const nextConfig = {
...
    experimental: {
    appDir: true,
    }
...
}
```

## Running Locally

From the app root folder (the folder relative to the package.json file -$ cd app):

1. Install dependencies:

```sh
yarn
```

2. Create an .env file in app root folder (see 1Password)

3. Start the dev server:

```sh
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) and Sign in with Google using the test credentials (see 1Password). You may need to open a private browsing session to avoid trying to sign in with your current google account

Next.js 13 introduced a new file-system based router which works in a new directory named app.

[app routes](https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory) can be accessed on [http://localhost:3000](http://localhost:3000).

Note: For ClimateTrax, we have implemented a dynamic folder to allow multi-lingual support; so, you can edit the default app page by modifying `app\[lng]\page.tsx`.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

### Next.js 13

See [Next.js 13 Documentation](https://beta.nextjs.org/docs) to learn more about Next.js 13, `app/` directory, and features such as:

- **Layouts:** Easily share UI while preserving state and avoiding re-renders.
- **Server Components:** Making server-first the default for the most dynamic applications.
- **Streaming:** Display instant loading states and stream in updates.
- **Suspense for Data Fetching:** `async`/`await` support and the `use` hook for component-level fetching.

Note: The `app/` directory can coexist with the existing `pages` directory for incremental adoption.

### i18next

Multi-lingual functionality within the Next.js app directory is realized using [i18next](https://www.i18next.com).

See [blog post](https://locize.com/blog/next-13-app-dir-i18n) for more detail.

Note: For ClimateTrax, we have implemented translations by reflecting the app\page folder structure within the app\i18n folder. As example, a page.tsx in folder app..\home\page.tsx will source English translations from app\i18n\locales\en\home\page.json, or source French translations from app\i18n\locales\fr\home\page.json.

### NextAuth.js

oAuth functionality is realized using NextAuth.js, an open source community project. See [NextAuth.js repo](https://github.com/nextauthjs/next-auth) to learn more.
Note: You must register your application at the developer portal of your provider.
Using Google example: https://www.youtube.com/watch?v=QXgFaHEuJOE
ClimateTrax Google Configuration: https://console.cloud.google.com/apis/credentials/oauthclient/77682378143-061racvi899q8vvgmcioqhbnu8pokm9o.apps.googleusercontent.com?project=emissions-elt-demo

### Next.js 13 middleware feature in combination with i18next and NextAuth.js

Next.js [Middleware ](https://nextjs.org/docs/advanced-features/middleware) allows control over requests before they are completed. Responses can be modified based on conditions such as authentication session or language detection along with implementing persistence via cookie. See middleware.ts in app root for ClimateTrax user authentication gating and language detection.

### GraphQL API

Creating a GraphQL API server for data fetching can be accomplished WITHOUT needing to write a GraphQL schema by using [PostGraphile](https://www.graphile.org/postgraphile/). Postgraphile can introvert and reflect an existing relational database schema exposing the schema and it's contents, automatically, via a GraphQL compliant HTTP API.

You can use PostGraphile via the CLI, the PostGraphile API, or as a framework middleware.

To get started, install PostGraphile

1. Install dependencies:

```sh
npm install postgraphile
```

#### CLI:

npx postgraphile \
 -c postgres://databaserolename:databaserolepassword@localhost:5432/databasename \
 --schema schemaname \
 --enhance-graphiql

#### PostGraphile API:

http://localhost:3000/api/graphiql

#### Middleware:

PostGraphile supports usage in library mode within various Node server frameworks, very concisely, as middleware.

In ClimateTrax, we mount a PostGraphile instance as HTTP middleware within the Next.js API route; so, data fetching occurs as follows:

1. Data fetching is done via HTTP promise request inside Server Components, directly in the components that use it.
   The HTTP request is made to a Next.js API route using either the Next.js 13 built-in [fetch() Web API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), or any other HTTP client such as [graphql-request](https://www.npmjs.com/package/graphql-request?activeTab=readme#graphql-request)
2. The Next.js API endpoint accepts the request containing a GraphQL query and uses a PostGraphile instance to query the Postgres database schema.
3. Once the fetch request is resolved the Server Components renders the data.

### UI

The ClimateTrax UI attempts to create a TELUS brand type of web experience using [Telus Universal Design System](https://telus.github.io/universal-design-system/components/allium/web).

All components are exported as named exports from root. The components must be wrapped in a theme provider called AlliumProvider. It is recommend to include the provider just once at the root of your application.

Attempting to place this wrapper in the layout.tsx or the DefaultLayout,tsx file caused hydration errors. See more detail in "Issues" below.

Also, the example github repos (below) returned error 404; so, reference examples are limited to the web link above.

[GitHub](https://github.com/telus/universal-design-system)
[Current work](https://github.com/orgs/telus/projects/159)

## ClimateTrax File Structure

### Overview

Currently, ClimateTrax uses the Next.js v13 beta app directly structure (😋 delicious!) but, the app folder could be replaced by the pages folder if beta concerns are raised for production build.

### Keeping Code Organized

The Next.js app directory provides a file structure allowing for `code organization`, `separation of concerns` and `single responsibility`. Each file in the ClimateTrax application is split into folders based on role related responsibilities.

### What does ClimateTrax App\API File Structure Look Like?

Below is an example the file structure for the 'home' route in the app and api directories for roles analyst, dropper, manager.

```bash
├── app
│   ├── [lng]
│   │   └── analyst
│   │       └── home
│   │           └── page.tsx
│   │   └── dropper
│   │       └── home
│   │           └── page.tsx
│   │   └── manager
│   │       └── home
│   │           └── page.tsx
│   ├── i18n
│   │   └── locales
│   │       └── en
│   │           └── home
│   │               └── page.json
│   │       └── fr
│   │           └── home
│   │               └── page.json
├── pages
│   ├── api
│   │   └── analyst
│   │       └── graphql.ts
│   │   └── dropper
│   │       └── graphql.ts
│   │   └── manager
│   │       └── graphql.ts
```

- [lng] is a dynamic folder accepting the language code within the app route.

### Issues

#### i18next:

in previous versions of next.js the i18nInstance could be a singleton but, this seems to fail in next.js 13; so, each translation call creates a new instance. See: src/app/i18n/index.ts

Note: if i18nInstance could be a singleton then the language, lng, parameter would not be necessary as toggling language could set the language property on the single i18nInstance instance.

#### Telus Universal Design System:

as attempts to wrap the components in the AlliumProvider by defining the provider once in the application root have not been successful, each Telus themed component is wrapped in the AlliumProvider tag.

Also, the following browser console errors have been documented without but no resolution has been achieved.

Warning: A props object containing a "key" prop is being spread into JSX:
let props = {key: someKey, direction: ..., testID: ..., space: ...};
<Spacer {...props} />

Warning: Failed prop type: The prop `children` is marked as required in `Box`, but its value is `undefined`.
