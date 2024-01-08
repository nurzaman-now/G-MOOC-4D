'use client';

// core
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';

// components
import HeroIcon from '../atoms/HeroIcon';
import Links from '../atoms/Links';
import NavbarButton from '../molecules/NavbarButton';

// data
import { navUrlPath } from '@/data/path-url';

//utils
// import { recognition } from '@/utils/speechRecognition';
import { colorTheme } from '@/utils/colorTheme';

const Navbar = ({ className }) => {
    const path = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleColorNav = () => {
        if (window.scrollY >= 200 || document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        handleColorNav();
        window.addEventListener('scroll', handleColorNav);
        return () => {
            window.removeEventListener('scroll', handleColorNav);
        };
    });

    return (
        <nav
            className={`${colorTheme(path)} ${
                isScrolled ? 'shadow-low' : 'shadow-none'
            } ${className} fixed top-0 z-20 w-screen  py-[20px] `}>
            <div className='mx-auto flex max-w-screen-xl items-center justify-between '>
                <HeroIcon
                    alt='icons'
                    imgUrl={path === '/rapor' ? '/images/icon-white.svg' : '/images/voice-icon.svg'}
                    height={100}
                    width={100}
                />
                <Links links={navUrlPath} />
                <NavbarButton />
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
