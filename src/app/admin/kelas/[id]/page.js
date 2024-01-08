'use client';
import { adminGetAllLevelKelasApi, adminGetClassByIdApi, adminUpdateClassApi, adminUpdateImageClassApi } from '@/axios/admin';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdUpdate } from 'react-icons/md';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';

import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import { getImageFile } from '@/utils/getServerStorage';

import Swal from 'sweetalert2';

export default function EditKelas() {
    const { data } = useSession();
    const token = data?.user?.token;
    const [dataClass, setDataClass] = useState(null);
    const [dataLevel, setDataLevel] = useState([]);

    const [notif, setNotif] = useState(false);
    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const router = useRouter();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    // const [idLevel, setIdLevel] = useState(1);
    const [idLevel, setIdLevel] = useState('');
    const { id } = useParams();

    // const [selectedLevel, setSelectedLevel] = useState(dataClass ? dataClass.id_level : 1);

    // console.log(dataClass?.id_level);

    useEffect(() => {
        if (dataClass) {
            setIdLevel(dataClass.id_level || 1);
        }
    }, [dataClass]);

    useEffect(() => {
        if (token) {
            adminGetAllLevelKelasApi({ token }).then((res) => {
                setDataLevel(res.data);
            });

            adminGetClassByIdApi({ token, id_kelas: id }).then((res) => {
                // console.log(res);
                setDataClass(res.data);
            });
        }
    }, [token, id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await adminUpdateClassApi({
                id_kelas: id,
                id_level: idLevel,
                name,
                image,
                description,
                token,
            }).then((res) => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Kelas berhasil diperbarui!',
                    showConfirmButton: false,
                    timer: 3500,
                    timerProgressBar: true,
                }).then(() => {
                    router.push('/admin/kelas');
                });
            });
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

    return (
        <div>
            <div>
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
                            <span className='cursor-pointer' onClick={() => router.replace('/admin/kelas')}>
                                {' '}
                                Kelas
                            </span>
                            <span className='font-bold'>{'>'}</span>{' '}
                            <span className='cursor-pointer' onClick={() => router.replace(`/admin/kelas/${id}`)}>
                                {' '}
                                Edit Kelas
                            </span>
                        </div>
                        {dataClass !== null ? (
                            <div style={{ height: 'calc(100vh - 220px)' }} className='mr-[40px] mt-[40px]  '>
                                <div className='w-max rounded-[28px] bg-white px-[54px] py-[40px] drop-shadow'>
                                    <h1 className='text-[20px] font-bold leading-[20px]'>Edit Kelas</h1>
                                    <form className='mt-[20px] flex flex-col gap-3' onSubmit={handleUpdate}>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor=''>
                                                Nama Kelas <span className='text-alert-1'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                                onChange={(e) => setName(e.target.value)}
                                                defaultValue={dataClass.name}
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
                                                value={idLevel}
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
                                            <textarea
                                                name=''
                                                id=''
                                                cols='30'
                                                rows='5'
                                                className='border p-2'
                                                defaultValue={dataClass.description}
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
                                        <div>
                                            {image ? (
                                                <Image
                                                    alt=''
                                                    src={URL.createObjectURL(image)}
                                                    // fill
                                                    width={60}
                                                    height={60}
                                                />
                                            ) : (
                                                <Image
                                                    alt=''
                                                    src={getImageFile(dataClass.image)}
                                                    // fill
                                                    width={60}
                                                    height={60}
                                                />
                                            )}
                                        </div>
                                        <button
                                            type='submit'
                                            className='mx-auto flex items-center rounded bg-primary-1 px-3 py-2 text-center  text-white transition-all duration-300 hover:bg-primary-2'>
                                            <MdUpdate className='mr-2' /> Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <p>Tunggu hingga data kelas tersedia...</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
