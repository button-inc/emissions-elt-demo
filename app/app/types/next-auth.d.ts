import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // 👇️ Module augmentation to add 'role' definition to the Session object
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
