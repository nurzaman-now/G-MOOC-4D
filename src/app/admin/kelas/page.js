'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit, MdSearch } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';
import BorderedButton from '@/components/atoms/BorderedButton';
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import { adminDeleteClassApi, adminGetAllLevelKelasApi, adminGetClassByLevel, adminGetClassByQuery } from '@/axios/admin';
import { getImageFile } from '@/utils/getServerStorage';
import { formatDotString } from '@/utils/formatDot';
import Link from 'next/link';
import { getClassByLevel } from '@/axios/user';
import axios from 'axios';

const Pembelajaran = () => {
    const [notif, setNotif] = useState(false);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [catClass, setCatClass] = useState([]);
    const [idLevel, setIdLevel] = useState(1);
    const [loadData, setLoadData] = useState(false);
    const [idKelas, setIdKelas] = useState(0);
    const [searchKelas, setSearchKelas] = useState();

    // console.log(searchKelas);
    // console.log(typeof searchKelas);

    // console.log(token);

    useEffect(() => {
        if (token) {
            adminGetAllLevelKelasApi({ token }).then((res) => {
                setCatClass(res.data);
            });

            adminGetClassByLevel({ id: idLevel, token }).then((res) => {
                setClasses(res.data.kelas);
            });

            if (loadData) {
                adminGetClassByLevel({ id: idLevel, token }).then((res) => {
                    setClasses(res.data.kelas);
                    setLoadData(false);
                });
            }
        }
    }, [idLevel, token, loadData]);

    // console.log(searchKelas);

    // if (searchKelas === '') {
    //     setLoadData(true);
    // }

    const handleSearch = () => {
        if (searchKelas) {
            adminGetClassByQuery({ token, query: searchKelas }).then((res) => {
                // console.log(res);
                setClasses(res.data);
            });
        } else {
            setLoadData(true);
        }
    };

    const handleDelete = (id) => {
        adminDeleteClassApi({ token, id_kelas: id }).then((res) => {
            // Filter data yang telah dihapus
            if (res.metadata.status === 'success') {
                // setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== id));
                setLoadData(true);
            }
        });
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
                    <span className='font-bold  '>{'>'}</span> <span> List Kelas</span>
                </div>
                <div className='mr-[40px] mt-[10px]'>
                    <div className='flex items-center justify-between '>
                        <h1 className=' text-[30px] font-bold '>List Kelas</h1>
                        <div className='flex items-center gap-4'>
                            <FillButton
                                onClick={() => router.push('/admin/kelas/tambah')}
                                className='flex items-center gap-2 rounded-rad-5 px-[30px] py-[10px]'>
                                <AiOutlinePlus /> Tambah Data
                            </FillButton>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='search'
                                    className='rounded-md p-2'
                                    placeholder='Search Kelas...'
                                    onChange={(e) => setSearchKelas(e.target.value)}
                                />
                                <button onClick={handleSearch}>
                                    <MdSearch className='h-[24px] w-[24px]' />
                                </button>
                            </div>
                            {/* <button className='flex items-center gap-2 rounded-rad-5 border border-black px-[20px] py-[10px] font-bold'>
                              
                            </button> */}
                        </div>
                    </div>
                    <div className='flex items-center gap-3 pt-3'>
                        {catClass.map((item) => (
                            <div
                                key={item.id_level}
                                className={
                                    item.id_level === idLevel
                                        ? 'w-max rounded-[6px] border border-black bg-slate-300 px-2 py-1 font-bold text-black'
                                        : 'w-max rounded-[6px] border border-black  px-2 py-1 font-bold text-black'
                                }>
                                <button onClick={() => setIdLevel(item.id_level)}>{item.name}</button>
                            </div>
                        ))}
                    </div>
                </div>

                {classes.length ? (
                    <div
                        style={{ height: 'calc(100vh - 220px)' }}
                        className='mr-[40px] mt-[10px] grid grid-cols-12 gap-[30px] overflow-y-scroll'>
                        {classes.map((item) => (
                            <div
                                key={item.id_kelas}
                                className='relative col-span-3 h-[400px]   rounded-rad-7  bg-white p-[14px] shadow-lg '>
                                <div className='relative  h-[200px] w-full overflow-hidden rounded-rad-7'>
                                    <Image alt='' src={getImageFile(item.image)} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <h1 className='mt-[14px] text-body-2 font-bold'>{item.name}</h1>
                                <p>{formatDotString(item.description, 50)}</p>
                                <div className='absolute bottom-[14px] left-1/2 flex translate-x-[-50%] gap-2'>
                                    <button className='rounded-[4px] bg-primary-1 px-[12px] py-[6px] text-white transition-all duration-300 hover:bg-primary-2'>
                                        <Link href={`/admin/kelas/${item.id_kelas}`} className='flex items-center gap-2 '>
                                            <MdModeEdit />
                                            Edit
                                        </Link>
                                    </button>
                                    {/* <button
                                        onClick={handleNotif}
                                        className='flex items-center gap-2 rounded-[4px] bg-alert-1 px-[12px] py-[6px] text-white'>
                                        <MdDeleteOutline />
                                        Hapus
                                    </button> */}
                                    <button
                                        className='flex items-center gap-2 rounded-[4px] bg-alert-1 px-[12px] py-[6px] text-white transition-all duration-300 hover:bg-red-500'
                                        onClick={() => {
                                            // handleDelete(item.id_kelas);
                                            handleNotif();
                                            setIdKelas(item.id_kelas);
                                        }}>
                                        <MdDeleteOutline />
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Data sedang dimuat...</p>
                )}
                <DeletAdminNotif
                    isVisible={notif}
                    handleVisible={handleNotif}
                    time={2000}
                    deleted={() => {
                        handleDelete(idKelas);
                        handleNotif();
                    }}
                />
            </div>
        </section>
    );
};

export default Pembelajaran;
