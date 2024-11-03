import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../consts';

export const fetchEmployeeReport = createAsyncThunk(
    'report/fetchEmployeeReport',
    async ({ employeeId, token }: { employeeId: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/reports/employee/${employeeId}`, {
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
    }
);
