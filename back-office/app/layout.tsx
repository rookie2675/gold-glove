import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Gold Glove',
    description: 'Gold Glove Back Office Web Application',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
