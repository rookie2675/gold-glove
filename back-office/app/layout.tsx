import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import './globals.css';

const syne = Syne({});

export const metadata: Metadata = {
    title: 'Gold Glove',
    description: 'Gold Glove Back Office Web Application',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={syne.className}>{children}</body>
        </html>
    );
}
