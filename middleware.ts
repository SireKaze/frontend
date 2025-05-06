import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function middleware(req: any) {
    const token = req.nextauth?.token;

    // Jika tidak ada token, redirect ke halaman login
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    // Access langsung dari token

    if (req.nextUrl.pathname.startsWith("/book")) {
      console.log("req.nextUrl.pathname", req.nextUrl.pathname.endsWith("/update"));

      if (req.nextauth.token.role === "member" && req.nextUrl.pathname !== "/book") {
        return NextResponse.rewrite(new URL("/access", req.url));
      }

      if (req.nextauth.token.role === "admin") {
        if (
          req.nextUrl.pathname === "/book/tambah" &&
          req.nextauth.token.access.includes("create") === false
        ) {
          return NextResponse.rewrite(new URL("/access", req.url));
        }

        if (
          req.nextUrl.pathname === "/book/update" &&
          req.nextauth.token.access.includes("update") === false
        ) {
          return NextResponse.rewrite(new URL("/access", req.url));
        }

        // Admin memiliki akses ke halaman lain di bawah /book
        return NextResponse.next();
      }
    }

    // Jika semua kondisi terpenuhi, lanjutkan request
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token ? true : false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/api/auth/error",
    },
  }
);

// Konfigurasi matcher
export const config = {
  matcher: ["/book/tambah", "/book/update", "/book"],
};