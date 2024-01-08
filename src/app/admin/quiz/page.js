'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import admin, { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit, MdSearch } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';
import BorderedButton from '@/components/atoms/BorderedButton';
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import {
    adminDeleteQuizApi,
    adminGetAllLevelKelasApi,
    adminGetClassByLevel,
    adminGetQuizByKelas,
    adminGetQuizByQuery,
} from '@/axios/admin';
import Link from 'next/link';

const Quiz = () => {
    const [notif, setNotif] = useState(false);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [catClass, setCatClass] = useState([]);
    const [idLevel, setIdLevel] = useState(1);
    const [classes, setClasses] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [idQuiz, setIdQuiz] = useState();
    const [searchQuiz, setSearchQuiz] = useState();

    const handleNotif = () => setNotif(!notif);

    function getNamaKelasByID(id_kelas) {
        const kelas = classes.find((kelas) => kelas.id_kelas === id_kelas);
        return kelas.name;
    }

    useEffect(() => {
        if (token) {
            adminGetAllLevelKelasApi({ token }).then((res) => {
                setCatClass(res.data);
                // console.log(res);
            });
            adminGetClassByLevel({ id: idLevel, token }).then((res) => {
                setClasses(res.data.kelas);

                // Mengambil semua data kelas
                const allKelas = res.data.kelas;
                // Mengambil semua quiz dari semua kelas
                const allQuiz = allKelas.map((kelas) => kelas.quiz).flat();

                setQuiz(allQuiz);
            });
            if (loadData) {
                adminGetClassByLevel({ id: idLevel, token }).then((res) => {
                    setClasses(res.data.kelas);
                    setLoadData(false);
                });
            }
        }
    }, [idLevel, token, loadData]);

    const handleSearch = () => {
        if (searchQuiz) {
            adminGetQuizByQuery({ token, query: searchQuiz }).then((res) => {
                // console.log(res);
                setQuiz(res.data);
            });
        } else {
            setLoadData(true);
        }
    };

    const handleDelete = (id) => {
        adminDeleteQuizApi({ id_quiz: id, token }).then((res) => {
            // console.log(res);
            setLoadData(true);
        });
    };

    return (
        <section className='grid h-screen w-screen  grid-cols-12 overflow-y-hidden bg-primary-1 py-[20px]'>
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
                    <span className='font-bold'>{'>'}</span> <span> List Quiz</span>
                </div>
                <div className='mr-[40px] mt-[10px]'>
                    <div className='flex items-center justify-between '>
                        <div>
                            <h1 className=' text-[30px] font-bold '>List Quiz</h1>
                            <h3 className='text-[16px]'>Pilih Level Kelas</h3>
                        </div>
                        <div className='flex items-center gap-4'>
                            <FillButton
                                onClick={() => router.push('/admin/quiz/tambah')}
                                className='flex items-center gap-2 rounded-rad-5 px-[30px] py-[10px]'>
                                <AiOutlinePlus /> Tambah Data
                            </FillButton>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='search'
                                    className='rounded-md p-2'
                                    placeholder='Search Materi...'
                                    onChange={(e) => setSearchQuiz(e.target.value)}
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
                                            Nama Kelas
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Soal
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Jawaban
                                        </th>
                                        <th scope='col' className='px-6 py-4 text-center'>
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quiz
                                        ? quiz.map((item, index = 0) => (
                                              <tr key={index + 1} className='border-b border-gray-400 '>
                                                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-black'>
                                                      {index + 1}
                                                  </th>
                                                  <td className='px-6 py-4 font-medium text-black'>
                                                      {getNamaKelasByID(item.id_kelas)}
                                                  </td>
                                                  <td className='px-6 py-4 font-medium text-black'>{item.question}</td>
                                                  <td>
                                                      {item.options.map((option) => (
                                                          <div key={option.id_option}>
                                                              {option.kunci === item.true_answer
                                                                  ? `${option.kunci}. ${option.option}`
                                                                  : ''}
                                                          </div>
                                                      ))}
                                                  </td>
                                                  <td className='flex items-center gap-2 px-6 py-4 font-medium text-black'>
                                                      <button className='rounded-[4px] bg-primary-1 px-[12px] py-[6px] text-white transition-all duration-300 hover:bg-primary-2'>
                                                          <Link
                                                              href={`/admin/quiz/${item.id_quiz}`}
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
                                                              setIdQuiz(item.id_quiz);
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
                    <p>Sedang memuat data...</p>
                )}
            </div>
            <DeletAdminNotif
                isVisible={notif}
                handleVisible={handleNotif}
                deleted={() => {
                    handleDelete(idQuiz);
                    handleNotif();
                }}
                time={2000}
            />
        </section>
    );
};

export default Quiz;
