import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Must be string (not string | undefined) to match DefaultUser
    plan?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    plan?: string;
  }
}