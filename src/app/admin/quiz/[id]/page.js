'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit, MdSearch, MdUpdate } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';
import BorderedButton from '@/components/atoms/BorderedButton';
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import { adminCreateQuizApi, adminGetAllClassApi, adminGetQuizByIdApi, adminUpdateQuizApi } from '@/axios/admin';
import Swal from 'sweetalert2';

const EditQuiz = () => {
    const [notif, setNotif] = useState(false);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [classes, setClasses] = useState([]);
    const [idKelas, setIdKelas] = useState(1);

    const [soal, setSoal] = useState();
    const [opsiA, setOpsiA] = useState('');
    const [opsiB, setOpsiB] = useState('');
    const [opsiC, setOpsiC] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [trueAnswer, setTrueAnswer] = useState();
    const { id } = useParams();

    useEffect(() => {
        if (token) {
            adminGetAllClassApi({ token }).then((res) => {
                setClasses(res.data);
                // console.log(res.data);
            });
            adminGetQuizByIdApi({ token, id_quiz: id }).then((res) => {
                const dataQuiz = res.data;
                // console.log(dataQuiz);
                setQuiz(dataQuiz);
                // console.log('ini dari quiz', dataQuiz.id_kelas);
                setIdKelas(dataQuiz.id_kelas);
                setSoal(dataQuiz.question);
                const option = dataQuiz.options;
                option.map((item) => {
                    if (item.kunci === 'A') {
                        setOpsiA(item.option);
                    }
                    if (item.kunci === 'B') {
                        setOpsiB(item.option);
                    }
                    if (item.kunci === 'C') {
                        setOpsiC(item.option);
                    }
                });

                setTrueAnswer(dataQuiz.true_answer);
            });
        }
    }, []);

    const selectedClassName = classes.find((item) => item.id_kelas === quiz.id_kelas)?.name;
    // console.log('ini selectedclass', selectedClassName);
    // const selectedClass = classes.find((item) => {
    //     // Lakukan operasi atau pemeriksaan lain jika diperlukan dengan item
    //     return item.id_kelas === quiz.id_kelas;
    // });

    // const selectedClassName = selectedClass?.name;

    const handleUpdateQuiz = async (e) => {
        e.preventDefault();

        try {
            await adminUpdateQuizApi({
                token,
                id_quiz: id,
                id_kelas: idKelas,
                question: soal,
                option_A: opsiA,
                option_B: opsiB,
                option_C: opsiC,
                true_answer: trueAnswer,
            }).then((res) => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Kuis berhasil diperbarui!',
                    showConfirmButton: false,
                    timer: 3500,
                    timerProgressBar: true,
                }).then(() => {
                    router.push('/admin/quiz');
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

    // console.log(classes);
    // console.log(idKelas);
    // console.log(trueAnswer);

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
                    <span className='cursor-pointer' onClick={() => router.replace('/admin/quiz')}>
                        {' '}
                        List Quiz
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span> <span> Edit Quiz</span>
                </div>
                {classes.length ? (
                    <div style={{ height: 'calc(100vh - 220px)' }} className='mr-[40px] mt-[18px]  '>
                        <div className='w-max rounded-[28px] bg-white px-[54px] py-[14px] drop-shadow'>
                            <h1 className='pt-3 text-[20px] font-bold leading-[20px]'>Edit Quiz</h1>
                            <form className='mt-[20px] flex flex-col gap-3' onSubmit={handleUpdateQuiz}>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor=''>
                                        Nama Kelas <span className='text-alert-1'>*</span>
                                    </label>
                                    <select
                                        id='countries'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] px-2 py-1 font-monsterrat outline-none'
                                        onChange={(e) => setIdKelas(e.target.value)}
                                        // defaultValue={idKelas}
                                        value={idKelas}
                                        readOnly>
                                        {classes.map((item) => (
                                            <option disabled key={item.id_kelas} value={item.id_kelas}>
                                                {selectedClassName && item.id_kelas === quiz.id_kelas
                                                    ? `${selectedClassName}`
                                                    : item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor=''>
                                        Soal <span className='text-alert-1'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                        defaultValue={soal}
                                        onChange={(e) => setSoal(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Opsi Jawaban Soal <span className='text-alert-1'>*</span>
                                    </p>
                                </div>
                                <div className='flex flex-row items-center gap-4'>
                                    <p>A.</p>
                                    <input
                                        type='text'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                        defaultValue={opsiA}
                                        onChange={(e) => setOpsiA(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-row items-center gap-4'>
                                    <p>B.</p>
                                    <input
                                        type='text'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                        defaultValue={opsiB}
                                        onChange={(e) => setOpsiB(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-row items-center gap-4'>
                                    <p>C.</p>
                                    <input
                                        type='text'
                                        className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                        defaultValue={opsiC}
                                        onChange={(e) => setOpsiC(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p>
                                        Jawaban Benar <span className='text-alert-1'>*</span>
                                    </p>
                                    <div className='flex justify-between px-4'>
                                        <div className='flex gap-2'>
                                            <input
                                                type='radio'
                                                id='opsiA'
                                                value='A'
                                                checked={trueAnswer === 'A'}
                                                onChange={(e) => setTrueAnswer(e.target.value)}
                                            />
                                            <label htmlFor='opsiA'>A</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input
                                                type='radio'
                                                id='opsiB'
                                                value='B'
                                                checked={trueAnswer === 'B'}
                                                onChange={(e) => setTrueAnswer(e.target.value)}
                                            />
                                            <label htmlFor='opsiB'>B</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input
                                                type='radio'
                                                id='opsiC'
                                                value='C'
                                                checked={trueAnswer === 'C'}
                                                onChange={(e) => setTrueAnswer(e.target.value)}
                                            />
                                            <label htmlFor='opsiC'>C</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-[10px] flex items-center justify-center'>
                                    <button
                                        type='submit'
                                        className='mx-auto flex items-center rounded bg-primary-1 px-3 py-2 text-center  text-white transition-all duration-300 hover:bg-primary-2'>
                                        <MdUpdate className='mr-2' /> Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p>Data sedang dimuat</p>
                )}
            </div>
            <DeletAdminNotif isVisible={notif} handleVisible={handleNotif} time={2000} />
        </section>
    );
};

export default EditQuiz;