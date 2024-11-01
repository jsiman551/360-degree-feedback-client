import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../consts';

export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async (token: string) => {
        const response = await axios.get(`${BASE_API_URL}/employees`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data.data;
    }
);
