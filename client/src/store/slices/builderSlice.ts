import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { QuestionType, type Question } from '../generated/graphql';

interface BuilderState {
    title: string;
    description: string;
    questions: Question[];
}

const initialState: BuilderState = {
    title: '',
    description: '',
    questions: [],
};

const builderSlice = createSlice({
    name: 'builder',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => { state.title = action.payload; },
        setDescription: (state, action: PayloadAction<string>) => { state.description = action.payload; },
        addQuestion: (state) => {
            const newId = state.questions.length ? (Number(state.questions[state.questions.length-1].id) + 1).toString() : '1';
            state.questions.push({ id: newId, title: '', type: QuestionType.Text, options: [] });
        },
        updateQuestion: (state, action: PayloadAction<{ id: string; fields: Partial<Question> }>) => {
            const index = state.questions.findIndex((q) => q.id === action.payload.id);
            if (index !== -1) 
                state.questions[index] = { ...state.questions[index], ...action.payload.fields };
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter((q) => q.id !== action.payload);
        },
        resetBuilder: () => initialState,
    },
});

export const { setTitle, setDescription, addQuestion, updateQuestion, removeQuestion, resetBuilder } = builderSlice.actions;
export default builderSlice.reducer;