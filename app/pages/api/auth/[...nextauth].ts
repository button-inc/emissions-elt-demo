import NextAuth, { NextAuthOptions } from "next-auth";
import { request, gql } from "graphql-request";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

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
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // 👉️Custom provider https://next-auth.js.org/v3/configuration/providers#using-a-custom-provider
  ],
  // 👇️ defining custom pages
  pages: {
    signIn: "../../auth/signin",
  },
  callbacks: {
    // 👇️ called whenever a JSON Web Token is created - we can add to the JWT in this callback
    async jwt({ token }) {
      // 👇️ add role to the token from our permissions table
      if (!token.role) {
        async function getUserRole() {
          const endpoint = process.env.API_HOST + "api/auth/role";
          const query =
            gql`
            {
             permissions(condition: { email: "` +
            token.email +
            `" })  {
                nodes {
                  email
                  userrole
                }
              }
            }`;
          const data = await request(endpoint, query);
          return data[Object.keys(data)[0]].nodes as any[];
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
    async session({ session, token }) {
      // 👇️ extend the session object to get more information about the user from useSession()- see ap\types\next-auth.d
      session.user.role = token.role;

      return session;
    },
  },
};

export default NextAuth(authOptions);
