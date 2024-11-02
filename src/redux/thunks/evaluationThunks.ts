import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Evaluation } from '../slices/evaluationSlice';
import { BASE_API_URL } from '../../consts';

export const fetchEmployeeEvaluations = createAsyncThunk<
    Evaluation[],
    { employeeId: string; token: string }
>('evaluations/fetchEmployeeEvaluations', async ({ employeeId, token }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/evaluations/employee/${employeeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            const message = error.response?.data?.errors?.[0]?.message || error.response?.data?.message;
            if (message) {
                return rejectWithValue(message || 'Error at evaluation loading');
            }
            return rejectWithValue(error.message);
        }
    }
});
