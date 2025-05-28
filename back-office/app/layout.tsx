import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import './globals.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Toaster } from 'sonner';

const syne = Syne({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Gold Glove',
    description: 'Gold Glove Back Office Web Application',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={syne.className}>
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
