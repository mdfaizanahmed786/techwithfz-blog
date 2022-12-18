import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest, res: NextResponse) {
  let cookie = request.cookies.get("authToken");

  if (
    cookie?.name === "authToken" &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
