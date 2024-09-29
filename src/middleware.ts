import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/server-utils/DAL/session";

const protectedRoutes = ["/dashboard", "/view-log", "/recipe"];
const publicRoutes = ["/signin", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  let session = null;

  try {
    session = await verifySession();
  } catch (error) {
    console.error(error);
  }

  if (isProtectedRoute && !session?.userName) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (session?.userName && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
