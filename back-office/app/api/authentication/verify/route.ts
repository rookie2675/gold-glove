import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
    const requestCookies = await cookies();

    try {
        const token = requestCookies.get('authentication-token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return NextResponse.json({ error: 'JWT_SECRET not configured' }, { status: 500 });
        }

        jwt.verify(token, secret);
        return NextResponse.json({ authenticated: true });
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
