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
                !request.nextUrl.pathname.startsWith("/details") &&
                !request.nextUrl.pathname.startsWith("/user")
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
        // Match all routes except the ones that start with /login and api and the static folder
        "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
    ],
};