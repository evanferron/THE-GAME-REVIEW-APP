import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../../interfaces/redux/AuthState';
import { getToken, removeUserCookie, setToken, setUserCookie } from '@utils/api/auth';
import { User } from '../../../interfaces/api/User';

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
                    profilePictureId: action.payload.user.profilePictureId ?? 0,
                }
            )
        },
        setTokens: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            setToken(state.token);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false
            state.user = null;
            removeUserCookie();
        }
    },
});

export const { setUser, setTokens, logout } = authSlice.actions;

export default authSlice.reducer;
