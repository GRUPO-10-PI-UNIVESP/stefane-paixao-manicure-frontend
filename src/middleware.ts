import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("isLoggedIn")?.value;
  if (currentUser && request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/clients", request.url));
  }
  if (!currentUser && request.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
