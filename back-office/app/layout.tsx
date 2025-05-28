import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import './globals.css';
import Header from './components/Header/Header';
import { Toaster } from 'sonner';
import { headers } from 'next/headers';

const syne = Syne({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Gold Glove',
    description: 'Gold Glove Back Office Web Application',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const headerList = await headers();
    const pathname = headerList.get('x-current-path') || '/';

    return (
        <html lang="en">
            <body className={syne.className}>
                {pathname !== '/login' && <Header />}
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
