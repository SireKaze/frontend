import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
 
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function middleware(req:any) {
    console.log("token", req.nextauth.token);

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.user?.role !== "admin"
    ) {
      // return NextResponse.redirect(new URL("/member", req.url));
      return NextResponse.rewrite(new URL("/access", req.url));
    }

    return NextResponse.next(); //jika tidak ada token maka redirect ke halaman login
    

    //tempat kodingnya
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true; //jika token tidak ada maka tidak bisa redirect ke halaman admin/user
        return false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/api/auth/error",
    },
  }
);
 
export const config = { matcher: ["/admin", "/admin/:path*", "/belajar"] };