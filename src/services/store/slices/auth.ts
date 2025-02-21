import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../../interfaces/redux/AuthState';
import { getAuthToken } from '@utils/auth';
import { User } from '../../../interfaces/api/User';

const token = getAuthToken();

// ### Initialisation de l'état par défaut de l'authentification. ### //
const initialState: AuthState = {
    token: token || null,
    isAuthenticated: !!token,
    user: null,
};

// ### Slice contenant l'état et les actions liées à l'authentification. ### //
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action pour connecter un utilisateur et définir son état.
        setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token; // Stocke le jeton d'authentification.
            state.isAuthenticated = true; // Marque l'utilisateur comme authentifié.
            state.user = action.payload.user; // Enregistre les informations utilisateur.
        },
        // Action pour déconnecter un utilisateur et réinitialiser son état.
        logout: (state) => {
            state.token = null; // Supprime le jeton d'authentification.
            state.isAuthenticated = false; // Indique que l'utilisateur n'est plus authentifié.
            state.user = null; // Réinitialise les informations utilisateur.
        }
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
