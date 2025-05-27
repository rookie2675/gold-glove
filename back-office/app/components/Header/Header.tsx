'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';
import { JSX } from 'react';

function isPathActive(pathname: string, path: string): boolean {
    return pathname === path;
}

export default function Header(): JSX.Element {
    const pathname: string = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoContainer}>
                    <Link href={'/'}>
                        <Image src="/logo-with-text.svg" alt="Gym Logo" width={200} height={100} />
                    </Link>
                </div>

                <nav className={styles.navigationLinksContainer}>
                    <Link
                        href="/customers"
                        className={styles.navLink + (isPathActive(pathname, '/customers') ? ' ' + styles.active : '')}
                        aria-current={isPathActive(pathname, '/customers') ? 'page' : undefined}
                    >
                        CLIENTES
                    </Link>
                    <Link
                        href="/employees"
                        className={styles.navLink + (isPathActive(pathname, '/employees') ? ' ' + styles.active : '')}
                        aria-current={isPathActive(pathname, '/employees') ? 'page' : undefined}
                    >
                        EMPREGADOS
                    </Link>
                </nav>

                <div className={styles.logoutContainer}>
                    <Link href="/logout" className={styles.logoutLink} aria-label="Logout">
                        LOGOUT
                    </Link>
                </div>
            </div>
        </header>
    );
}
