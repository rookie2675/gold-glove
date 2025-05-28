import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/api/authentication/login'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value;
    let session;

    try {
        if (cookie) {
            session = await jwtVerify(cookie, new TextEncoder().encode(process.env.JWT_SECRET!));
        }
    } catch (error) {
        console.error('Session verification failed:', error);
    }

    if (!isPublicRoute && (!session || !session.payload.authenticated)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
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
