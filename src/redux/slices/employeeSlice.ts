import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees } from '../thunks/employeeThunks';

interface Employee {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch employees';
            });
    },
});

export default employeeSlice.reducer;
