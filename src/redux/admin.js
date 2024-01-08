// import { MdPeopleAlt, MdLibraryBooks, MdOutlineClass, MdQuiz } from 'react-icons/md';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeMenuId: 1,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setActiveMenuId: (state, action) => {
            state.activeMenuId = action.payload;
        },
    },
});

export const getActiveMenuId = (state) => state.admin.activeMenuId;

export default adminSlice.reducer;
