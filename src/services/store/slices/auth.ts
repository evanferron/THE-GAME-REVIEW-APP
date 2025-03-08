import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../../interfaces/redux/AuthState';
import { getAuthToken } from '@utils/api/auth';
import { User } from '../../../interfaces/api/User';

const token = getAuthToken();

const initialState: AuthState = {
    token: token ?? null,
    isAuthenticated: !!token,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        setTokens: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false
            state.user = null;
        }
    },
});

export const { setUser, setTokens, logout } = authSlice.actions;

export default authSlice.reducer;
