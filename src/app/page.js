'use client';

// core
// import { useRouter } from 'next/navigation';

// import { useSession } from 'next-auth/react';

// component
// import Navbar from '@/components/organism/Navbar';
// import Hero from '@/components/organism/Hero';
import Login from './login/page';

const Beranda = () => {
    // const { data } = useSession();
    // const user = data?.user.name;

    return (
        <>
            {/* <Navbar />
            <Hero /> */}
            <Login />
            {/* <CheckPermission /> */}
        </>
    );
};

export default Beranda;
