import { MY_BANKS } from '@/helper/const';
import { to_vietnam_dong } from '@/helper/helpers';
import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { QRCode } from '../Components/qr-code';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { money, content, bank } = searchParams;
    const myBank = MY_BANKS.find((item) => item.id === bank);

    if (!myBank) {
        return { title: '404', description: 'Page not found' };
    }

    try {
        const previousImages = ['/images/qr-code.ico'];
        const title = `QR thanh toán tiền cho Quang Trọng`;
        let descriptionContent = 'QR thanh toán';

        if (money) {
            const formattedMoney = to_vietnam_dong(money as string);
            descriptionContent += ` ${formattedMoney}₫ bằng chữ ${formattedMoney}`;
        } else {
            descriptionContent += ' hoá đơn';
        }

        if (content) {
            descriptionContent += `, Nội dung chuyển khoản ${content}`;
        }
        return {
            title,
            description: descriptionContent,
            openGraph: {
                images: [...previousImages],
            },
        };
    } catch (error) {
        console.error('Error fetching QR code data:', error);
        return { title: '500', description: 'Internal Server Error' };
    }
}

const QRCodePage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <QRCode />
    </Suspense>
);

export default QRCodePage;
