import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../../interfaces/redux/AuthState';
import { getToken, setUserCookie } from '@utils/api/auth';
import { User } from '../../../interfaces/api/User';
import Cookies from 'js-cookie';

const token = getToken();

const initialState: AuthState = {
    token: token ?? null,
    isAuthenticated: !!token,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ token: string; refreshToken: string; user: User }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            setUserCookie(
                {
                    token: action.payload.token,
                    refreshToken: action.payload.refreshToken,
                    email: action.payload.user.email ?? '',
                    pseudo: action.payload.user.pseudo ?? '',
                }
            )
        },
        setTokens: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false
            state.user = null;
            Cookies.remove('refreshToken');
            Cookies.remove('token');
            Cookies.remove('email');

        }
    },
});

export const { setUser, setTokens, logout } = authSlice.actions;

export default authSlice.reducer;
