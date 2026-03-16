import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdmin = token?.role === "ADMIN";
        const { pathname } = req.nextUrl;

        // Redirect non-admins to login, but skip if already on login page
        if (!isAdmin && pathname !== "/admin/login") {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                // Allow access to login page without token
                if (pathname === "/admin/login") return true;
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
