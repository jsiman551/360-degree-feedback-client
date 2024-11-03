import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEvaluationById, fetchEmployeeEvaluations } from '../thunks/evaluationThunks';

interface Employee {
    username: string;
}

interface Evaluator {
    username: string;
    role: string;
}

interface Feedback {
    _id: string;
    feedbackText: string;
    score: number;
    date: string;
    user: string;
}

export interface Evaluation {
    _id: string;
    employee: Employee;
    evaluator: Evaluator;
    feedbacks: Feedback[];
    score: number;
    comments: string;
    date: string;
    updatedAt: string;
}

interface EvaluationState {
    evaluations: Evaluation[];
    evaluation: Evaluation | null; //evaluation detail
    loading: boolean;
    error: string | null;
}

const initialState: EvaluationState = {
    evaluations: [],
    evaluation: null,
    loading: false,
    error: null,
};

const evaluationSlice = createSlice({
    name: 'evaluations',
    initialState,
    reducers: {
        clearEvaluations(state) {
            state.evaluations = [];
            state.evaluation = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeEvaluations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeEvaluations.fulfilled, (state, action: PayloadAction<Evaluation[]>) => {
                state.loading = false;
                state.evaluations = action.payload;
            })
            .addCase(fetchEmployeeEvaluations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load evaluations';
            })
            .addCase(fetchEvaluationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvaluationById.fulfilled, (state, action: PayloadAction<Evaluation>) => {
                state.loading = false;
                state.evaluation = action.payload;
            })
            .addCase(fetchEvaluationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load evaluation';
            });
    },
});

export const { clearEvaluations } = evaluationSlice.actions;
export default evaluationSlice.reducer;
