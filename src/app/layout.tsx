import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
    title: 'Tạo mã QR nhận tiền',
    description: 'Trang chủ - Tạo Mã QR nhận Tiền',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" sizes="564x564"></link>
            </head>
            <body className={inter.className} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
