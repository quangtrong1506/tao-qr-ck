'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../Components/Loading';

function Display() {
    // const params = useParams<{ money: string; content: string }>();
    const searchParams = useSearchParams();
    const money = searchParams.get('money');
    const content = searchParams.get('content');
    const [img, setImg] = useState<string>('');
    useEffect(() => {
        document.title = `QRCode ${money} đ`;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            acqId: '970422',
            accountName: 'LUONG QUANG TRONG',
            accountNo: '0389619050',
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

        return () => {};
    }, [content, money]);
    return (
        <div className="relative w-screen h-screen">
            <div className=" flex h-full justify-center align-middle items-center">
                <div className="p-1">{img ? <Image src={img} width={300} height={300} alt="..." /> : <Loading />}</div>
            </div>
        </div>
    );
}
const DisplayPage = () => {
    return (
        <Suspense>
            <Display />
        </Suspense>
    );
};

export default DisplayPage;
