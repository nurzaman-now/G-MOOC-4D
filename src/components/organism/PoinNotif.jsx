'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

const PoinNotif = ({ isVisible, handleVisible, time }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                handleVisible();
            }, time);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, handleVisible, time]);

    if (isVisible) {
        return (
            <div className={`fixed  inset-0 z-30 flex items-center  justify-center bg-black bg-opacity-60 font-monsterrat`}>
                <div className='relative flex h-[238px] w-[500px] flex-col items-center justify-center rounded-[10px] bg-white'>
                    <div className='absolute left-1/2 top-[-70px] flex h-[154px] w-[154px] translate-x-[-50%] items-center justify-center rounded-full bg-[#EDF3F3]'>
                        {/* <MdOutlineDelete className='h-[80px] w-[80px] text-alert-1' /> */}
                        <Image alt='' src={'/images/award.svg'} width={69} height={97} />
                    </div>
                    <h1 className='mt-[50px] text-[20px] font-bold leading-[20px]'>Selamat Kamu Mendapat 5 Poin !</h1>
                    {/* <div className='mt-[20px] flex items-center gap-5'>
                        <button
                            onClick={handleVisible}
                            className='rounded-[4px] bg-[#EDF3F3] px-[16px] py-[4px] font-bold text-black '>
                            Cancel
                        </button>
                        <button className='rounded-[4px] bg-alert-1 px-[16px] py-[4px] font-bold text-white'>Hapus</button>
                    </div> */}
                </div>
            </div>
        );
    }
};

export default PoinNotif;
