'use client';

import Link from 'next/link';
import styles from './NavigationLink.module.css';

interface NavigationLinkProps {
    href: string;
    label: string;
    isPathActive: boolean;
}

export default function NavigationLink({ href, label, isPathActive }: NavigationLinkProps) {
    return (
        <Link href={href} className={styles.navLink + (isPathActive ? ' ' + styles.active : '')} aria-current={isPathActive ? 'page' : undefined}>
            {label}
        </Link>
    );
}
