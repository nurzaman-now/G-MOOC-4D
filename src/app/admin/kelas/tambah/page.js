'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit, MdSearch, MdSave } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';
import BorderedButton from '@/components/atoms/BorderedButton';
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import { adminCreateClassApi, adminGetAllLevelKelasApi } from '@/axios/admin';
import Swal from 'sweetalert2';
// import { initializeApp } from 'firebase-admin/app';
// import { getMessaging } from 'firebase/messaging';

const TambahPembelajaran = () => {
    const [notif, setNotif] = useState(false);
    const [dataLevel, setDataLevel] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    // id_level, image, description, name, token

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [id_level, setIdLevel] = useState(1);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);

    // firebase
    // const admin = require('firebase-admin');
    // const serviceAccount = require('./g-mooc4d-firebase-adminsdk-xakvb-0505405a52.json');

    // const alreadyCreatedAps = admin.apps;
    // const yourFirebaseAdminConfig = {
    //     credential: admin.credential.cert(serviceAccount),
    //     databaseURL: 'https://g-mooc4d-default-rtdb.asia-southeast1.firebasedatabase.app',
    // };

    // if (alreadyCreatedAps.length === 0) {
    //     admin.initializeApp(yourFirebaseAdminConfig, 'gmooc-notif');
    // }

    // initializeApp(yourFirebaseAdminConfig, 'app2');
    // const app = initializeApp();

    // const App = alreadyCreatedAps.length === 0 ? initializeApp({ yourFirebaseAdminConfig }, 'app') : alreadyCreatedAps[0];
    // initializeApp(App);

    // admin.initializeApp({});

    // console.log(token);
    useEffect(() => {
        if (token) {
            adminGetAllLevelKelasApi({ token }).then((res) => {
                // console.log(res.data);
                setDataLevel(res.data);
            });
        }
    }, [token]);

    // console.log(token)
    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            const response = await adminCreateClassApi({ token, name, description, image, id_level });
            console.log(response);
            const notificationResponse = await fetch('https://server-notif.vercel.app/api/notification/sendToAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Tambahkan header lain jika diperlukan (misalnya token otorisasi)
                },
                body: JSON.stringify({
                    message: 'Kelas baru telah ditambahkan!', // Sesuaikan pesan notifikasi
                }),
            });

            const notificationResult = await notificationResponse.json();
            console.log('Notification Response:', notificationResult);
            Swal.fire({
                icon: 'success',
                title: 'Kelas berhasil ditambahkan!',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
            }).then(() => {
                router.push('/admin/kelas');
            });

            // Send a message to the device corresponding to the provided
            // registration token.
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Terjadi kesalahan: ${error.message || error}`,
                timer: 5000,
                timerProgressBar: true,
            });
        }
    };

    const handleNotif = () => setNotif(!notif);
    return (
        <section className='grid h-screen  w-screen grid-cols-12 bg-primary-1 py-[20px]'>
            <div className='relative col-span-2 mx-[40px] '>
                <Image alt='' src={'/images/icon-white.svg'} width={131} height={60} />
                <ul className='mt-[60px] flex flex-col  gap-6'>
                    {navAdmin.length
                        ? navAdmin.map((nav) => (
                              <li
                                  onClick={() => {
                                      dispatch(setActiveMenuId(nav.id));
                                      router.replace('/admin');
                                  }}
                                  key={nav.id}
                                  className='flex cursor-pointer items-center gap-2'>
                                  {activeMenuId === nav.id
                                      ? customNavAdminIcon({ iconName: nav.icon, isActive: true })
                                      : customNavAdminIcon({ iconName: nav.icon, isActive: false })}
                                  <span
                                      className={`${
                                          activeMenuId === nav.id ? 'text-white' : 'text-white opacity-50'
                                      } font-semibold `}>
                                      {nav.path}
                                  </span>
                              </li>
                          ))
                        : null}
                </ul>
                <button
                    type='button'
                    onClick={() => router.replace('/login')}
                    className='absolute bottom-0 flex items-center gap-2 '>
                    <AiOutlinePoweroff className='font-bold text-[#EDF3F3]' />{' '}
                    <span className='block font-semibold text-[#EDF3F3]'>Keluar</span>
                </button>
            </div>
            <div className='col-span-10  rounded-bl-[28px] rounded-tl-[28px] bg-[#EDF3F3] pl-[40px] pt-[30px]'>
                <div className='flex items-center gap-3 '>
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin')}>
                        Admin
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span>{' '}
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin/pembelajaran')}>
                        {' '}
                        List Kelas
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span> <span> Tambah Kelas</span>
                </div>

                {token ? (
                    <div style={{ height: 'calc(100vh - 220px)' }} className='mr-[40px] mt-[40px]  '>
                        <div className='w-max rounded-[28px] bg-white px-[54px] py-[40px] drop-shadow'>
                            <h1 className='text-[20px] font-bold leading-[20px]'>Tambah Kelas</h1>
                            <form className='mt-[20px] flex flex-col gap-3' onSubmit={handleAddLesson}>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor=''>
                                        Nama Kelas <span className='text-alert-1'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='fladminCreateClassApi({ name, description, image });ex flex-col gap-1'>
                                    <label htmlFor=''>
                                        Level Kelas <span className='text-alert-1'>*</span>
                                    </label>
                                    <select
                                        onChange={(e) => setIdLevel(e.target.value)}
                                        name=''
                                        id=''
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'>
                                        {dataLevel.map((item) => (
                                            <option key={item.id_level} value={item.id_level}>
                                                {item.id_level} ({item.name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor=''>
                                        Deskripsi <span className='text-alert-1'>*</span>
                                    </label>
                                    {/* <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                    onChange={(e) => setDescription(e.target.value)}
                                /> */}
                                    <textarea
                                        name=''
                                        id=''
                                        cols='30'
                                        rows='5'
                                        className='border p-2'
                                        onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor=''>
                                        Image <span className='text-alert-1'>*</span>
                                    </label>
                                    <input
                                        type='file'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                {image && <Image src={URL.createObjectURL(image)} width={30} height={30} alt='image' />}
                                {/* <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Nama Materi <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Link <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                />
                                <span className='text-[12px] font-bold'>Tambah Materi+</span>
                            </div>
                            <div className='mt-[10px] flex items-center justify-center'>
                                <button
                                    type='submit'
                                    className='w-max    rounded-[10px] bg-primary-1  px-[40px] py-[8px] font-bold text-white'>
                                    Simpan
                                </button>
                            </div> */}
                                <button
                                    type='submit'
                                    className='mx-auto flex items-center rounded bg-primary-1 px-3 py-2 text-center  text-white transition-all duration-300 hover:bg-primary-2'>
                                    <MdSave className='mr-2' /> Submit
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p>data sedang dimuat...</p>
                )}
            </div>
            <DeletAdminNotif isVisible={notif} handleVisible={handleNotif} time={2000} />
        </section>
    );
};

export default TambahPembelajaran;
