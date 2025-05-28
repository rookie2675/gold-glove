'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';
import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/authentication-service';
import useAuthentication from '@/app/hooks/useAuthentication';
import NavigationLink from './NavigationLink';

function isPathActive(pathname: string, path: string): boolean {
    return pathname === path;
}

export default function Header(): JSX.Element {
    const router = useRouter();
    const pathname: string = usePathname();

    function onLogoutButtonClick() {
        logout();
        router.push('/login');
    }

    const { isAuthenticated } = useAuthentication();

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoContainer}>
                    <Link href={'/'}>
                        <Image src="/logo-with-text.svg" alt="Gym Logo" width={150} height={100} priority />
                    </Link>
                </div>

                {isAuthenticated && (
                    <>
                        <nav className={styles.navigationLinksContainer}>
                            <NavigationLink href="/customers" label="CLIENTES" isPathActive={isPathActive(pathname, '/customers')} />
                            <NavigationLink href="/employees" label="EMPREGADOS" isPathActive={isPathActive(pathname, '/employees')} />
                        </nav>

                        <div className={styles.logoutContainer}>
                            <button onClick={onLogoutButtonClick} aria-label="Logout">
                                LOGOUT
                            </button>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
