import { MdPeopleAlt, MdOutlineClass, MdQuiz } from 'react-icons/md';

export const customNavAdminIcon = ({ iconName, isActive = false }) => {
    switch (iconName) {
        case 'MdPeopleAlt':
            return <MdPeopleAlt className={`${isActive ? 'text-white' : 'text-white opacity-50'} h-[38px] w-[38px] `} />;
        case 'MdOutlineClass':
            return <MdOutlineClass className={`${isActive ? 'text-white' : 'text-white opacity-50'} h-[38px] w-[38px] `} />;
        case 'MdQuiz':
            return <MdQuiz className={`${isActive ? 'text-white' : 'text-white opacity-50'} h-[38px] w-[38px] `} />;
    }
};

export const navAdmin = [
    {
        id: 1,
        icon: 'MdPeopleAlt',
        path: 'Siswa',
    },
    {
        id: 2,
        icon: 'MdOutlineClass',
        path: 'Kelas',
    },
    // {
    //     id: 3,
    //     icon: 'MdOutlineClass',
    //     path: 'Materi',
    // },
    // {
    //     id: 4,
    //     icon: 'MdQuiz',
    //     path: 'Quiz',
    // },
];
