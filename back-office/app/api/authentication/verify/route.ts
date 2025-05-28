import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
    const requestCookies = await cookies();
    const token = requestCookies.get('session')?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        return NextResponse.json({ authenticated: true });
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
