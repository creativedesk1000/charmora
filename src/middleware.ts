import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith("/admin")) {
        // Basic placeholder check for demo purposes
        // In production, use next-auth getToken or session check
        const isAdmin = request.cookies.get("admin-auth")?.value === "true";

        if (!isAdmin && pathname !== "/admin/login") {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
