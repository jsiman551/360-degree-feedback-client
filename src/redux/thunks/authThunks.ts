import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '../../consts';

interface Credentials {
    username: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        role: 'Admin' | 'Manager' | 'Employee';
    };
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post<LoginResponse>(
                `${BASE_API_URL}/auth/login`,
                credentials
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.errors?.[0]?.message || error.response?.data?.message;
                if (message) {
                    return rejectWithValue(message || 'Error at login');
                }
                return rejectWithValue(error.message);
            }
        }
    }
);
