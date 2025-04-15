import { withAuth } from "next-auth/middleware";
 
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/api/auth/error",
    },
  }
);
 
export const config = { matcher: ["/admin", "/admin/:path*"] };