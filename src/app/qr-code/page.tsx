import type { Metadata } from 'next';
import { Suspense } from 'react';
import { QRCode } from '../Components/qr-code';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};
export const metadata: Metadata = {
    icons: '/images/qr-code.ico',
};
// export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     const { m, c, b } = searchParams;
//     const myBank = MY_BANKS.find((item) => item.id === b);

//     if (!myBank) {
//         return { title: '404', description: 'Page not found' };
//     }

//     try {
//         const title = `QR thanh toán tiền cho Quang Trọng`;
//         let descriptionContent = 'QR thanh toán';

//         if (m) {
//             const formattedMoney = to_vietnam_dong(m as string);
//             descriptionContent += ` ${parseInt(m as string, 10).toLocaleString('vi-VN')}₫ bằng chữ ${formattedMoney}`;
//         } else {
//             descriptionContent += ' hoá đơn';
//         }

//         if (c) {
//             descriptionContent += `, Nội dung chuyển khoản: "${c}"`;
//         }
//         return {
//             title,
//             description: descriptionContent,
//             icons: ['/images/qr-code.ico', 'https://qr-nhantien.vercel.app/images/qr-code.ico'],
//             openGraph: {
//                 images: ['/images/qr-code.ico', 'https://qr-nhantien.vercel.app/images/qr-code.ico'],
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching QR code data:', error);
//         return { title: '500', description: 'Internal Server Error' };
//     }
// }

const QRCodePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <QRCode />
    </Suspense>
);

export default QRCodePage;
