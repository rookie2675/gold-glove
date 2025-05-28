import { JWTPayload } from 'jose';
import { SignJWT } from 'jose/jwt/sign';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface LoginRequest {
    email: string;
    password: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not configured');
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const loginRequest: LoginRequest = await request.json();
    const invalidCredentialsResponse: NextResponse = NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    if (!loginRequest.email || !loginRequest.password) {
        return invalidCredentialsResponse;
    }

    if (loginRequest.email !== process.env.LOGIN_EMAIL || loginRequest.password !== process.env.LOGIN_PASSWORD) {
        return invalidCredentialsResponse;
    }

    const payload: JWTPayload = {
        authenticated: true,
        email: loginRequest.email,
        iat: Math.floor(Date.now() / 1000),
    };

    const session = await new SignJWT(payload)
        .setIssuedAt()
        .setExpirationTime('7d')
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json({ success: true });

    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}
