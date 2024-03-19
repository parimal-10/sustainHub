import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    switch (token.role) {
        case "ADMIN":
            if (!request.nextUrl.pathname.startsWith("/admin") &&
                !request.nextUrl.pathname.startsWith("/details")
            ) {
                return NextResponse.redirect(new URL(`/admin?id=${token.id}`, request.url));
            }
            break;
        case "USER":
            if (
                !request.nextUrl.pathname.startsWith("/user") &&
                !request.nextUrl.pathname.startsWith("/profile")
            ) {
                return NextResponse.redirect(new URL(`/user?id=${token.id}`, request.url));
            }
            break;
        default:
            return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/details", "/user", "/admin", "/profile"
    ],
};