'use client';

//core
import PropTypes from 'prop-types';
import Image from 'next/image';

//components
import FillButton from '../atoms/FillButton';
import MicButton from '../atoms/MicButton';

const Hero = ({ className }) => {
    return (
        <main style={{ height: 'calc(100vh - 150px)' }} className={`${className} mx-auto mt-[150px] max-w-screen-xl`}>
            <div className='grid grid-cols-12'>
                <div className='flex items-center justify-start col-span-6 '>
                    <div>
                        <h1 className='font-bold text-head-1'>
                            <span className='text-secondary-1'>Semua</span> Berhak <br /> untuk bisa belajar
                        </h1>

                        <p className='mt-[24px] leading-tight'>
                            Buktikan bahwa semua bisa dilakukan <br /> jika kita mempunyai niat yang kuat
                        </p>
                        <FillButton className='bg-color-1 border-color-1 mt-[24px] rounded-rad-3 border px-[98px] py-[12px] text-body-1 font-semibold text-white'>
                            Get Started
                        </FillButton>
                    </div>
                </div>
                <div className='flex items-center justify-center col-span-6 '>
                    <div className='flex'>
                        <Image className='pt-[120px]' alt='' src={'/images/blind.svg'} width={240} height={240} />
                        <div>
                            <MicButton />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

Hero.propTypes = {
    className: PropTypes.string,
};

export default Hero;
