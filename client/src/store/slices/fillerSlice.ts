import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AnswerValue } from '../../types/forms';

interface FillerState {
    answers: { [questionId: string]: AnswerValue };
}

const initialState: FillerState = {
    answers: {},
};

const fillerSlice = createSlice({
    name: 'filler',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ questionId: string; value: AnswerValue }>) => {
            state.answers[action.payload.questionId] = action.payload.value;
        },
        resetFiller: (state) => {
            state.answers = {};
        },
    },
});

export const { setAnswer, resetFiller } = fillerSlice.actions;
export default fillerSlice.reducer;