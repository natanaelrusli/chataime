import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);
const isLoginRoute = createRouteMatcher(["/login"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect unauthenticated users to /login
  if (isProtectedRoute(req) && !userId) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl, 307);
  }

  // Redirect logged-in users away from /login to their previous page or /
  if (isLoginRoute(req) && userId) {
    const referer = req.headers.get("referer") || "/";
    return NextResponse.redirect(new URL(referer, req.nextUrl.origin), 307);
  }

  return NextResponse.next(); // Continue as normal if no redirect is needed
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
