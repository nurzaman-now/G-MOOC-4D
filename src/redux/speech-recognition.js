import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listening: false,
    isSpeech: false,
};

export const speechRecognitionSlice = createSlice({
    name: 'speech-recognition',
    initialState,
    reducers: {
        setListening: (state, action) => {
            state.listening = action.payload;
        },
    },
});

export const getListening = (state) => state.speechRecognition.listening;

export default speechRecognitionSlice.reducer;
