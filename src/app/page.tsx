/* eslint-disable @next/next/no-img-element */
'use client';

import { BankTypes, LIST_BANK, MY_BANKS } from '@/helper/const';
import { stringToSlug, to_vietnam_dong } from '@/helper/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const router = useRouter();
    const [money, setMoney] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isShowBank, setIsShowBank] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bank, setBank] = useState<BankTypes>();
    const handleClick = () => {
        if (content) setContent('');
        else {
            let num = parseInt(money.replaceAll('.', ''));
            if (Number.isNaN(num) || num < 1000) {
                setContent('Trả Tiền TrongSaDoa');
            } else setContent(`Trả TrongSaDoa ${num.toString().slice(0, num.toString().length - 3)} Tỷ Đồng`);
        }
    };
    const handleSubmit = () => {
        setIsLoading(true);
        router.push(`/qr-code?m=${money.replaceAll('.', '')}&c=${content}&b=${bank?.id}`);
    };
    useEffect(() => {
        setBank(MY_BANKS[0]);
    }, []);
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center">
                <main className="max-w-[400px] w-full px-3 min-h-[400px]">
                    <form
                        className="max-w-md mx-auto"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_money"
                                id="bank"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                autoComplete="off"
                                readOnly
                                onClick={() => {
                                    setIsShowBank(true);
                                }}
                                value={bank ? `${bank.label} (${bank.value})` : ''}
                            />
                            <label
                                htmlFor="floating_money"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Ngân hàng
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_money"
                                id="floating_money"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={money ?? 0}
                                onChange={(e) => {
                                    let s = new Intl.NumberFormat('vi-VN').format(
                                        parseInt(e.target.value.replaceAll('.', ''))
                                    );
                                    setMoney(s === 'NaN' ? '0' : s);
                                }}
                                autoComplete="off"
                            />
                            <label
                                htmlFor="floating_money"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Số tiền
                            </label>
                        </div>
                        {money && to_vietnam_dong(money.replaceAll('.', '')) != '? đồng' && (
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_content"
                                    id="floating_content"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                                    placeholder=" "
                                    value={to_vietnam_dong(money.replaceAll('.', ''))}
                                    readOnly
                                />
                                <label
                                    htmlFor="floating_content"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Số tiền chi tiết
                                </label>
                            </div>
                        )}
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="floating_content"
                                id="floating_content"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={content}
                                autoComplete="off"
                                onChange={(e) => {
                                    setContent(stringToSlug(e.target.value));
                                }}
                            />
                            <label
                                htmlFor="floating_content"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nội dung
                            </label>
                            <div
                                className="absolute right-1 top-[12px] w-[22px] cursor-pointer hover:bg-black/20 rounded p-1"
                                onClick={handleClick}
                            >
                                {content ? (
                                    <svg
                                        className="w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {isLoading ? <span>Loading...</span> : <>Tạo QR</>}
                        </button>
                    </form>
                </main>
            </div>
            {isShowBank ? (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => {
                        setIsShowBank(false);
                    }}
                ></div>
            ) : null}
            {isShowBank ? (
                <div className="fixed bottom-5 max-w-[400px] w-full px-3 left-[calc(50%-200px)] z-50 animate-slide-up">
                    <div className="flex flex-col w-full">
                        <div className="w-full bg-white rounded-lg">
                            {MY_BANKS.map((bank) => (
                                <div key={bank.id} className="w-full flex flex-col justify-center items-center">
                                    <div
                                        className="w-full flex flex-col hover:bg-black/5 rounded-lg p-2 cursor-pointer"
                                        onClick={() => {
                                            setBank(bank);
                                            setIsShowBank(false);
                                        }}
                                    >
                                        <div className="font-semibold text-lg flex gap-2 justify-between">
                                            <div className="w-auto h-8 flex items-center">{bank.label}</div>
                                            <div className="w-auto h-8">
                                                <Image
                                                    className="h-full object-contain"
                                                    src={LIST_BANK.find((b) => bank.bank_id === b.id)?.logo ?? ''}
                                                    alt="bank-logo"
                                                    width={96}
                                                    height={32}
                                                />
                                            </div>
                                        </div>
                                        <div>{bank.value}</div>
                                    </div>
                                    <div className="w-11/12 bg-black/10 h-[1px]"></div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="text-center mt-3 text-red-600 bg-white p-2 rounded-lg cursor-pointer"
                            onClick={() => {
                                setIsShowBank(false);
                            }}
                        >
                            Đóng
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
