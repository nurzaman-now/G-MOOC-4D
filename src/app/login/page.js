'use client';

// core
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// third parties
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

// hooks
import { useNotification } from '@/hooks';

// component
import BorderedButton from '@/components/atoms/BorderedButton';
import FillButton from '@/components/atoms/FillButton';
import InputRef from '@/components/atoms/InputRef';
import PasswordInputRef from '@/components/atoms/PasswordInputRef';
import Label from '@/components/atoms/Label';
import Notification from '@/components/organism/Notification';

const Login = () => {
    const router = useRouter();
    const { notifData, handleNotifAction, handleNotifVisible } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;

        const response = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (!response?.error) {
            router.replace('/admin', { scroll: false });
        } else if (response?.error) {
            handleNotifAction('error', response.error);
        }
    };

    return (
        <section className='grid h-screen grid-cols-12'>
            <div className={`relative  col-span-4 h-full`}>
                <Image priority src={'/images/left-auth.webp'} alt='' fill sizes='100vh' />
                <Image
                    alt=''
                    src={'/images/icon-white.svg'}
                    width={166}
                    height={60}
                    className='absolute left-[24px] top-[24px]'
                />
                <div
                    className={`absolute bottom-[30%] left-1/2 flex translate-x-[-50%] flex-col items-center justify-center gap-5 text-white`}>
                    <h1 className='text-[40px] font-bold leading-[20px]'>Hallo !</h1>
                    <p className='text-center '>Admin Area - Mulai Sesuatu yang Hebat</p>
                </div>
            </div>
            <div className='col-span-8 flex items-center justify-center bg-neutral-7'>
                <div className='flex w-[646px] flex-col gap-[42px]'>
                    <div className='text-center'>
                        <h1 className='text-title-2 font-bold'>Masuk G-MOOC 4D</h1>
                    </div>
                    <form className='flex flex-col items-center gap-[24px]' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full'>
                            <Label htmlFor='email' className={`${errors.email?.message ? 'text-alert-1' : 'text-black'}`}>
                                {errors.email?.message || <span className='invisible'>.</span>}
                            </Label>
                            <InputRef
                                id='email'
                                placeholder='Email'
                                type='text'
                                {...register('email', {
                                    required: 'Email tidak boleh kosong!',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Format email tidak sesuai!',
                                    },
                                })}
                                className={`${
                                    errors.email?.message
                                        ? 'border-alert-1 focus:border-alert-1'
                                        : 'border-neutral-6 focus:border-primary-1'
                                }   bg-neutral-6 px-6 py-[17px] text-body-2 font-normal `}
                            />
                        </div>
                        <div className='w-full'>
                            <Label htmlFor='password' className={`${errors.password?.message ? 'text-alert-1' : 'text-black'}`}>
                                {errors.password?.message || <span className='invisible'>.</span>}
                            </Label>
                            <PasswordInputRef
                                id='password'
                                placeholder='Kata Sandi'
                                isError={errors.password?.message ? true : false}
                                {...register('password', {
                                    required: 'Password tidak boleh kosong!',
                                    minLength: {
                                        value: 8,
                                        message: 'Jumlah Karaktek tidak boleh kurang dari 8!',
                                    },
                                })}
                                className={`${
                                    errors.password?.message
                                        ? 'border-alert-1 focus:border-alert-1'
                                        : 'border-neutral-6 focus:border-primary-1'
                                }   bg-neutral-6 px-6 py-[17px] text-body-2 font-normal `}
                            />
                        </div>
                        <FillButton type='submit' className='w-max px-[52px] py-[16px]'>
                            Masuk
                        </FillButton>
                    </form>
                </div>
            </div>
            <Notification
                isVisible={notifData.isVisible}
                time={notifData.time}
                handleVisible={handleNotifVisible}
                text={notifData.text}
                type={notifData.type}
            />
        </section>
    );
};

export default Login;
