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
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import { adminDeleteMateriApi, adminGetAllLevelKelasApi, adminGetClassByLevel, adminGetMateriByQuery } from '@/axios/admin';
import Link from 'next/link';

const Materi = () => {
    const [notif, setNotif] = useState(false);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [classes, setClasses] = useState([]);
    const [materi, setMateri] = useState([]);
    const [catClass, setCatClass] = useState([]);
    const [idLevel, setIdLevel] = useState(1);
    const [loadData, setLoadData] = useState(false);
    const [idMateri, setIdMateri] = useState(0);
    const [searchMateri, setSearchMateri] = useState();

    // console.log(token);

    useEffect(() => {
        if (token) {
            adminGetAllLevelKelasApi({ token }).then((res) => {
                setCatClass(res.data);
            });

            adminGetClassByLevel({ id: idLevel, token }).then((res) => {
                const resClass = res.data.kelas;
                setClasses(resClass);
                const allMateri = resClass.reduce((acc, kelas) => {
                    return [...acc, ...kelas.materi];
                }, []);
                setMateri(allMateri);
            });

            if (loadData) {
                adminGetClassByLevel({ id: idLevel, token }).then((res) => {
                    setClasses(res.data.kelas);
                    setLoadData(false);
                });
            }
        }
    }, [idLevel, token, loadData]);

    function getNamaKelasByID(id_kelas) {
        const kelas = classes.find((kelas) => kelas.id_kelas === id_kelas);
        return kelas.name;
    }

    const handleSearch = () => {
        if (searchMateri) {
            adminGetMateriByQuery({ token, query: searchMateri }).then((res) => {
                // console.log(res);
                setMateri(res.data);
            });
        } else {
            setLoadData(true);
        }
    };

    const handleDelete = (id) => {
        adminDeleteMateriApi({ token, id_materi: id }).then((res) => {
            // Filter data yang telah dihapus
            if (res.metadata.status === 'success') {
                // setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== id));
                setLoadData(true);
            }
        });
    };

    const handleNotif = () => setNotif(!notif);

    return (
        <section className='grid h-screen  w-screen grid-cols-12 overflow-y-hidden bg-primary-1 py-[20px]'>
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
                    <span className='font-bold'>{'>'}</span> <span> List Materi</span>
                </div>
                <div className='mr-[40px] mt-[10px]'>
                    <div className='flex items-center justify-between '>
                        <div>
                            <h1 className=' text-[30px] font-bold '>List Materi</h1>
                            <h1>Pilih Level Kelas</h1>
                        </div>
                        <div className='flex items-center gap-4'>
                            <FillButton
                                onClick={() => router.push('/admin/materi/tambah')}
                                className='flex items-center gap-2 rounded-rad-5 px-[30px] py-[10px]'>
                                <AiOutlinePlus /> Tambah Data
                            </FillButton>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='search'
                                    className='rounded-md p-2'
                                    placeholder='Search Materi...'
                                    onChange={(e) => setSearchMateri(e.target.value)}
                                />
                                <button onClick={handleSearch}>
                                    <MdSearch className='h-[24px] w-[24px]' />
                                </button>
                            </div>
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
                    <div className='mt-[24px] '>
                        {/* <FillButton className='flex w-max items-center gap-5 px-[40px] py-[14px]'>
                            <AiOutlinePlus /> Tambah Data
                        </FillButton> */}
                        <div
                            style={{ height: 'calc(100vh - 200px)' }}
                            className='mr-[40px] mt-[20px] overflow-x-auto overflow-y-scroll rounded-[28px]  bg-white drop-shadow '>
                            <table className='w-full text-left '>
                                <thead className='sticky top-0 border-b border-gray-400 bg-gray-50 font-bold text-black'>
                                    <tr>
                                        <th scope='col' className='px-6 py-4'>
                                            No
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Kelas
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Nama
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Materi
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            URL
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Poin
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Aksi
                                        </th>
                                        {/* <th scope='col' className='px-6 py-4'>
                                            Aksi
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {materi
                                        ? materi.map((materi, index = 0) => (
                                              <tr key={index + 1} className='border-b border-gray-400 '>
                                                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-black'>
                                                      {index + 1}
                                                  </th>
                                                  <td className='px-6 py-4 font-medium text-black'>
                                                      {getNamaKelasByID(materi.id_kelas)}
                                                  </td>
                                                  <td className='px-6 py-4 font-medium text-black'>{materi.name}</td>
                                                  <td className='px-6 py-4 font-medium text-black'>{materi.materi}</td>
                                                  <td className='px-6 py-4 font-medium text-black'>{materi.url}</td>
                                                  <td className='px-6 py-4 font-medium text-black'>{materi.poin}</td>
                                                  <td className='flex items-center gap-2 px-6 py-4 font-medium text-black'>
                                                      <button className='rounded-[4px] bg-primary-1 px-[12px] py-[6px] text-white transition-all duration-300 hover:bg-primary-2'>
                                                          <Link
                                                              href={`/admin/materi/${materi.id_materi}`}
                                                              className='flex items-center gap-2 '>
                                                              <MdModeEdit />
                                                              Edit
                                                          </Link>
                                                      </button>
                                                      <button
                                                          className='flex items-center gap-2 rounded-[4px] bg-alert-1 px-[12px] py-[6px] text-white transition-all duration-300 hover:bg-red-500'
                                                          onClick={() => {
                                                              // handleDelete(item.id_kelas);
                                                              handleNotif();
                                                              setIdMateri(materi.id_materi);
                                                          }}>
                                                          <MdDeleteOutline />
                                                          Hapus
                                                      </button>
                                                  </td>
                                              </tr>
                                          ))
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Tidak ada data kelas</p>
                )}
                <DeletAdminNotif
                    isVisible={notif}
                    handleVisible={handleNotif}
                    time={2000}
                    deleted={() => {
                        handleDelete(idMateri);
                        handleNotif();
                    }}
                />
            </div>
        </section>
    );
};

export default Materi;
