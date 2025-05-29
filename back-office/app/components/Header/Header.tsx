'use server';

import styles from '@/app/components/Header/Header.module.css';

import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '@/app/components/Header/LogoutButton';
import NavigationLink from '@/app/components/Header/NavigationLink';

export default async function Header(): Promise<React.JSX.Element> {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <Link href={'/'} className={styles.logoLink}>
                        <Image src="/logo-with-text.svg" alt="Gym Logo" width={140} height={85} priority />
                    </Link>
                </div>
                <nav className={styles.navigationLinksContainer}>
                    <NavigationLink href="/customers" label="CLIENTES" />
                    <NavigationLink href="/employees" label="EMPREGADOS" />
                </nav>
                <div className={styles.logoutContainer}>
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
