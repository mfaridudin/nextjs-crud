import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const isAuth = !!req.nextauth.token;
        const isLoginPage =
            req.nextUrl.pathname.startsWith("/auth/login") ||
            req.nextUrl.pathname.startsWith("/auth/register");

        if (isAuth && isLoginPage) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: [
        "/auth/login",
        "/auth/register",
    ],
};
