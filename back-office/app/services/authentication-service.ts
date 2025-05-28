'use client';

import { LoginFormFields } from '../types/login-form-fields';

export async function login(credentials: LoginFormFields): Promise<boolean> {
    try {
        const response = await fetch('/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return data.success;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

export async function logout(): Promise<void> {
    try {
        await fetch('/api/authentication/logout', {
            method: 'POST',
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
}
