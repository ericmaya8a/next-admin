import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { CONSTANTS } from "./app/constatnts";

const protectedRoutes = [CONSTANTS.urls.ADMIN];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith(CONSTANTS.urls.LOGIN) ||
      req.nextUrl.pathname.startsWith(CONSTANTS.urls.SIGNIN);
    const isProtectedRoute = protectedRoutes.some((item) =>
      req.nextUrl.pathname.startsWith(item)
    );

    if (isProtectedRoute && !isAuth) {
      return NextResponse.redirect(new URL(CONSTANTS.urls.LOGIN, req.url));
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(CONSTANTS.urls.ADMIN, req.url));
      }

      return null;
    }
  },
  {
    callbacks: {
      authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);
