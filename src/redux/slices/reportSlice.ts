import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeeReport } from '../thunks/reportThunks';

interface ReportState {
    report: {
        employeeId: string;
        username: string;
        evaluations: Array<{ date: string; score: number; comments: string; evaluator: string }>;
        averageScore: number;
    };
    loading: boolean;
    error: null | string;
}

const initialState: ReportState = {
    report: {
        employeeId: "",
        username: "",
        evaluations: [],
        averageScore: 0,
    },
    loading: false,
    error: null,
};

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload;
            })
            .addCase(fetchEmployeeReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default reportSlice.reducer;
