import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "@store/slices/auth";
import { RootState } from "@store/store";
import { login, register } from "@api/auth";
import Cookies from 'js-cookie';


const useAuth = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user);

    const signIn = async (credentials: { email: string; password: string }) => {
        const response = await login(credentials.email, credentials.password);
        if (response.success) {
            dispatch(setUser({ token: response.token, user: response.user }));
        } else {
            console.error("Erreur de connexion :", response.message);
        }
    };

    const signUp = async (credentials: { email: string; username: string; password: string; confirmPassword: string }) => {
        const response = await register(credentials.email, credentials.username, credentials.password, credentials.confirmPassword);

        if (response.success) {
            dispatch(setUser({ token: response.token, user: response.user }));
        } else {
            console.error("Erreur d'inscription :", response.message);
        }
    };

    const signOut = () => {
        Cookies.remove('tashToken');
        dispatch(logout());
    };

    const isAuthenticated = Boolean(user);

    return { user, isAuthenticated, signIn, signOut, signUp };
};

export default useAuth;

