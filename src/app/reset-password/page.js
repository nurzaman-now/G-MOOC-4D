'use client';

// core
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// api
import { resetPasswordApi } from '@/axios/auth';

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // console.log(email);
    // console.log(token);

    useEffect(() => {
        if (email && token) {
            const fetchApi = async () => {
                try {
                    // console.log(email);
                    // console.log(token);
                    await resetPasswordApi({
                        email,
                        password: 'arief12345',
                        password_confirmation: 'arief12345',
                        token,
                    });
                    // console.log(response);
                } catch (error) {
                    console.log(error.message);
                }
            };
            fetchApi();
        }
    }, [email, token]);

    return <div>ResetPassword</div>;
};

export default ResetPassword;
