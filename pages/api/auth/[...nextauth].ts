/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GithubProvider from "next-auth/providers/github";
import { number } from "yup";

const authOptions: NextAuthOptions = {
  providers: [
    // ...add more providers here
    GithubProvider({
      clientId: "", //process.env.GITHUB_ID
      clientSecret: "", // process.env.GITHUB_SECRET
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
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
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
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("token: ", token);
      console.log("user:  ", user);
      return {...token, ...user,}
    },
  },

  pages : {
    signIn : "/auth/login",
    signOut : "/auth/login",
    error : "/auth/error"
  }
};

export default NextAuth(authOptions);