import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiPrefix, authRoutes } from "@/routes";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiPrefix);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (token) {
      return Response.redirect(new URL("/", request.url));
    }
    return null;
  }

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
