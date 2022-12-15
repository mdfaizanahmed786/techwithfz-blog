import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, res: NextResponse) {
  let cookie = request.cookies.get("auth");

  if (
    cookie?.name === "auth" &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
