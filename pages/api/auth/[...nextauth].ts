/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { number } from "yup";
import { socialLogin } from "@/app/auth/lib";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials: any, req: any) {
        console.log("credentials", credentials);
        console.log("req", req);
        return {
          ...credentials,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("session di session", session);
      console.log("token di session", token);
      session.user.id = Number(token.id);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("token: ", token);
      if (account?.provider === "google") {
      console.log("ini google", token);
      const res = await socialLogin({
        email: token.email!,
        nama: token.name!,
        avatar: token.picture!,
      });
      console.log("Res", res);
      return {
        ...token,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        role: "admin",
        redirect: false,
        access: ["read", "update", "delete", "list"],
        id: res.data.id,
      };
      }

      if (account?.provider === "github") {
      console.log("ini github", token);
      const res = await socialLogin({
        email: token.email!,
        nama: token.name!,
        avatar: token.picture!,
      });
      console.log("Res", res);
      return {
        ...token,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        role: "admin",
        redirect: false,
        access: ["read", "delete", "list"],
        id: res.data.id,
      };
      }

      console.log("user:  ", user);
      return { ...token, ...user };
    },
    
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
