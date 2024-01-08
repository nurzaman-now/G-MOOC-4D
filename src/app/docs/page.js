'use client';

// test component
import BorderedButton from '@/components/atoms/BorderedButton';
import ArrowButton from '@/components/atoms/ArrowButton';
import FillButton from '@/components/atoms/FillButton';
import HeroIcon from '@/components/atoms/HeroIcon';
import Links from '@/components/atoms/Links';
import MicButton from '@/components/atoms/MicButton';
import InputRef from '@/components/atoms/InputRef';
// import PasswordInput from '@/components/atoms/PasswordInput';
import PasswordInputRef from '@/components/atoms/PasswordInputRef';
import NavbarButton from '@/components/molecules/NavbarButton';
import Navbar from '@/components/organism/Navbar';

const Docs = () => {
    const navLink = [
        {
            href: '/docs',
            name: 'Beranda',
        },
        {
            href: '/kelas',
            name: 'Kelas',
        },
        {
            href: '/rapor',
            name: 'Rapor',
        },
    ];

    return (
        <div className='flex h-screen w-screen flex-col items-center justify-center gap-10 bg-neutral-3 '>
            <div className='flex flex-col items-center justify-center rounded-rad-5 bg-white p-5 shadow-high'>
                <h1 className='pb-3 font-bold'>Arrow Button</h1>
                <div className='flex gap-10 '>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <p>Left</p>
                        <ArrowButton directionIcon={'left'} widthIcon={20} heightIcon={20} />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <p>Right</p>
                        <ArrowButton directionIcon={'right'} widthIcon={20} heightIcon={20} />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <p>Top</p>
                        <ArrowButton directionIcon={'top'} widthIcon={20} heightIcon={20} />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <p>Bottom</p>
                        <ArrowButton directionIcon={'bottom'} widthIcon={20} heightIcon={20} />
                    </div>
                </div>
            </div>
            <div className='flex gap-5'>
                <FillButton>test</FillButton>
                <BorderedButton theme='light'>test</BorderedButton>
                <BorderedButton theme='dark'>test</BorderedButton>
            </div>

            <div>
                <HeroIcon alt='icons' imgUrl='/images/voice-icon.svg' height={100} width={100} />
            </div>

            <div>
                <Links links={navLink} />
            </div>

            <div>
                <MicButton />
            </div>

            <div className='w-[646px]'>
                <InputRef />
            </div>

            <div className='w-[646px]'>
                <PasswordInputRef />
            </div>

            <div>
                <NavbarButton />
            </div>

            <div>
                <Navbar />
            </div>

            <div className='mb-[100px]'></div>
        </div>
    );
};

export default Docs;
