import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
const protectedRoutes = ["/profile", "/appearance", "/seo"];

export { default } from "next-auth/middleware";
// const isLoggedIn: boolean = true;

export async function middleware(request: NextRequest, response: NextResponse) {
  // const session = await getServerSession({ req: request });
  console.log(
    "cookies ==>",
    request.cookies.get("next-auth.session-token")?.value
  );
  const isLoggedIn: boolean = !!request.cookies.get("next-auth.session-token")
    ?.value;
  if (!isLoggedIn && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
