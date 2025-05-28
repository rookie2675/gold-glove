import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const publicPaths = ['/login', '/api/authentication/login'];
    const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

    if (isPublicPath) {
        return NextResponse.next();
    }

    const token = request.cookies.get('authentication-token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /**
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - icon.svg and other icon files
         */
        '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.jpeg).*)',
    ],
};
