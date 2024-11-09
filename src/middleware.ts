import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware triggered", request.url);
  const currentUser = request.cookies.get("isLoggedIn")?.value;
  console.log("currentUser:", currentUser);

  if (currentUser && request.nextUrl.pathname === "/") {
    console.log("Redirecting to /clients");
    return Response.redirect(new URL("/clients", request.url));
  }

  if (!currentUser && request.nextUrl.pathname !== "/") {
    console.log("Redirecting to /");
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
