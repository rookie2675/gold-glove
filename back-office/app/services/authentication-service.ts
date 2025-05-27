import { LoginFormFields } from '../types/login-form-fields';

export class AuthenticationService {
    static async login(credentials: LoginFormFields): Promise<boolean> {
        const email = process.env.NEXT_PUBLIC_LOGIN_EMAIL;
        const password = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

        if (credentials.email === email && credentials.password === password) {
            console.log('Login successful!');
            return true;
        }

        console.log('Login failed: Invalid credentials');
        return false;
    }
}
