import { useState, useEffect } from 'react';

export default function useAuthentication() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('/api/authentication/verify');
                const data = await response.json();
                setIsAuthenticated(data.authenticated);
            } catch {
                setIsAuthenticated(false);
            }
        };
        checkAuthentication();
    }, []);

    return { isAuthenticated };
}
