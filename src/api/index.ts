import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '../consts';
import { RegisterData, EvaluationData, FeedbackData, EvaluationFormData } from '../types';

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

export const registerEvaluation = async (data: EvaluationData, token: string) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/evaluations`, data, {
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

export const updateEvaluation = async (evaluationId: string, data: EvaluationFormData, token: string) => {
    try {
        const response = await axios.put(`${BASE_API_URL}/evaluations/${evaluationId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.errors?.[0]?.message || error.response?.data?.message || 'Error updating evaluation'
            );
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const addFeedback = async (data: FeedbackData, token: string) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/feedback`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.errors?.[0]?.message || error.response?.data?.message || 'Error during feedback submission'
            );
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
