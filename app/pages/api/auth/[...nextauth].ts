import NextAuth, { NextAuthOptions } from "next-auth";
import { request, gql } from "graphql-request";
import GoogleProvider from "next-auth/providers/google";

// 👉️ INFO: the full list of options go: https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // 👉️ INFO: the full list of providers: https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    // 👇️ called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
    async jwt({ token }) {
      // 👇️ if the jwt has no role, query our permissions table to get user role
      if (!token?.role) {
        async function getUserRole() {
          const endpoint = process.env.API_HOST + "api/auth/role";
          const query =
            gql`
            {
              allPermissions(condition: { email: "` +
            token.email +
            `" })  {
                nodes {
                  email
                  userrole
                }
              }
            }`;
          const data = await request(endpoint, query);
          return data?.allPermissions.nodes as any[];
        }
        const userData = await getUserRole();
        if (userData) {
          // 👉️ OK: set JWT role from our user record
          token.role = userData[0].userrole;
        } else {
          // ⛔️ Denied: this email is not in our permissions table
          token = null;
        }
      }
      // 👉️ OK: return encrypted token stored in cookie: next-auth.session-token
      return token;
    },
  },
};

export default NextAuth(authOptions);
