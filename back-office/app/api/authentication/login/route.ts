import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

interface LoginRequest {
    email: string;
    password: string;
}

interface JwtPayload {
    email: string;
    authenticated: boolean;
}

export async function POST(request: Request): Promise<NextResponse> {
    const loginRequest: LoginRequest = await request.json();

    if (!loginRequest.email || !loginRequest.password) {
        const error: string = 'Invalid credentials';
        const status: number = 401;
        return NextResponse.json({ error }, { status });
    }

    if (loginRequest.email !== process.env.LOGIN_EMAIL || loginRequest.password !== process.env.LOGIN_PASSWORD) {
        const error: string = 'Invalid credentials';
        const status: number = 401;
        return NextResponse.json({ error }, { status });
    }

    const payload: JwtPayload = {
        email: loginRequest.email,
        authenticated: true,
    };

    if (!process.env.JWT_SECRET) {
        return NextResponse.json({ error: 'JWT_SECRET is not configured' }, { status: 500 });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    const response = NextResponse.json({ success: true });

    response.cookies.set('auth-token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}
