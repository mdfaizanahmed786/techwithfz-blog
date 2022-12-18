import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret, verify } from "jsonwebtoken"

export async function  middleware(request: NextRequest, res: NextResponse) {
  let cookie = request.cookies.get("auth");
 
  try {
   verify(cookie?.value, process.env.JWT_SECRET as Secret);
     return NextResponse.next();
  } catch (error) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }

if (
    cookie?.name === "auth" &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }


}
