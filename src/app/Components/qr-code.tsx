'use client';
import { LIST_BANK, MY_BANKS } from '@/helper/const';
import { to_vietnam_dong } from '@/helper/helpers';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import Loading from './Loading';
function showNotification(message: string) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '50px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '14px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '5px 10px';
    notification.style.borderRadius = '5px';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    notification.style.textWrap = 'nowrap';
    notification.style.pointerEvents = 'none';

    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}
function QRCode() {
    const searchParams = useSearchParams();
    const [img, setImg] = useState<string>('');
    const money = searchParams.get('money');
    const content = searchParams.get('content');
    const bank = searchParams.get('bank');
    const [_, copyToClipboard] = useCopyToClipboard();
    useEffect(() => {
        const fetchData = () => {
            const money = searchParams.get('money');
            const content = searchParams.get('content');
            const bank = searchParams.get('bank');
            // document.title = `QRCode ${money} đ`;
            const myBank = MY_BANKS.find((item) => item.id === bank);
            if (!myBank) return;
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

            fetch('https://api.vietqr.io/v2/generate', {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            })
                .then((response) => response.json())
                .then((result) => setImg(result.data.qrDataURL))
                .catch((error) => console.error(error));
        };
        const setMeta = () => {
            const money = searchParams.get('money');
            const content = searchParams.get('content');
            document.title = `QR thanh toán tiền cho Quang Trọng`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                let contentString = 'QR thanh toán';
                if (money) contentString += ` ${to_vietnam_dong(money)}₫ bằng chữ ${to_vietnam_dong(money)}`;
                else contentString += ' hoá đơn';
                if (content) contentString += `, Nội dung chuyển khoản ${content}`;
                metaDescription.setAttribute('content', contentString);
            }
        };

        setMeta();
        fetchData();

        return () => {};
    }, [searchParams]);
    return (
        <div className="relative w-screen h-screen">
            <div className=" flex h-full justify-center align-middle items-center">
                <div className="p-1">
                    {img ? (
                        <>
                            <div>
                                <div className="px-1">
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <div className="text-xl font-semibold">Luong Quang Trong</div>
                                        <div
                                            className="p-1"
                                            onClick={() => {
                                                copyToClipboard(MY_BANKS.find((item) => item.id === bank)?.value ?? '');
                                                showNotification('Đã sao chép vào bộ nhớ tạm');
                                            }}
                                        >
                                            {MY_BANKS.find((item) => item.id === bank)?.value}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Image src={img} width={300} height={300} alt="..." />
                                </div>
                                <div className="px-1">
                                    <div className="w-full flex flex-col justify-center items-center">
                                        {content && (
                                            <>
                                                <div className="font-semibold text-lg">Nội dung</div>
                                                <div> {content}</div>
                                            </>
                                        )}
                                        {money && (
                                            <>
                                                <div className="font-semibold text-lg">Số tiền</div>
                                                <div>{new Intl.NumberFormat('vi-VN').format(parseInt(money))}</div>
                                                <div className="capitalize">{to_vietnam_dong(money)}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}

export { QRCode };
