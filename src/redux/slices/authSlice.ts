import { createSlice } from '@reduxjs/toolkit';
import { login } from '../thunks/authThunks';

interface User {
    id: string;
    username: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Employee';
}

interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: "",
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = "";
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'succeeded';
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.error = null;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Login failed';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
