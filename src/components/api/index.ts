import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '../../consts';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'Manager' | 'Employee';
}

export const registerUser = async (data: RegisterData, token: string) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/auth/register`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.errors?.[0]?.message || error.response?.data?.message || 'Error during registration'
            );
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
