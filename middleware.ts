import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"


export async function middleware(request: NextRequest, res: NextResponse) {
  let cookie = request.cookies.get("authToken") as any;

  if (
    cookie?.name === "authToken" &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup") || request.nextUrl.pathname.startsWith("/forgot")) 
      
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

if(request.nextUrl.pathname.startsWith("/admin") && cookie?.value!==process.env.NEXT_PUBLIC_ADMIN_TOKEN){
  return NextResponse.redirect(new URL("/", request.url));
}
else{
  return NextResponse.next();
}
                                 
}
