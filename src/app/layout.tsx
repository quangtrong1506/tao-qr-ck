import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
    title: 'Tạo mã QR nhận tiền',
    description: 'Trang chủ - Tạo Mã QR nhận Tiền',
    icons: '/images/icon.ico',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <head>
                <link rel="shortcut icon" href="/images/icon.ico" type="image/x-icon" />
            </head>
            <body className={inter.className} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
