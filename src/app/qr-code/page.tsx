import { Suspense } from 'react';

import { LIST_BANK, MY_BANKS } from '@/helper/const';
import { to_vietnam_dong } from '@/helper/helpers';
import type { Metadata, ResolvingMetadata } from 'next';
import { QRCode } from '../Components/qr-code';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    // const id = params.id;
    console.log(params, searchParams);

    // // fetch data
    const money = searchParams.money;
    const content = searchParams.content;
    const bank = searchParams.bank;
    // document.title = `QRCode ${money} đ`;
    const myBank = MY_BANKS.find((item) => item.id === bank);
    if (!myBank)
        return {
            title: '404',
            description: 'Page not found',
        };
    const BANK = LIST_BANK.find((item) => item.id === myBank.bank_id);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
        acqId: BANK?.bin,
        accountName: 'LUONG QUANG TRONG',
        accountNo: myBank.value,
        amount: money,
        addInfo: content,
        template: 'qr_only',
    });

    const data = await fetch('https://api.vietqr.io/v2/generate', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    }).then((response) => response.json());
    if (data.code != '00')
        return {
            title: '400',
            description: data.desc,
        };
    const previousImages = data.data.qrDataURL || [];

    const title = `QR thanh toán tiền cho Quang Trọng`;
    let contentString = 'QR thanh toán';
    if (money) contentString += ` ${to_vietnam_dong(money as string)}₫ bằng chữ ${to_vietnam_dong(money as string)}`;
    else contentString += ' hoá đơn';
    if (content) contentString += `, Nội dung chuyển khoản ${content}`;

    return {
        title,
        description: contentString || '',
        openGraph: {
            images: ['/some-specific-page-image.jpg', ...previousImages],
        },
    };
}

const QRCodePage = () => {
    return (
        <Suspense>
            <QRCode />
        </Suspense>
    );
};

export default QRCodePage;
