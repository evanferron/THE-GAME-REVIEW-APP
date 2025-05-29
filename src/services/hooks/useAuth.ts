import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "@store/slices/auth";
import { RootState } from "@store/store";
import { login, register } from "@api/auth";
import Cookies from 'js-cookie';
import { User } from "@interfaces/index";
import { getUser } from "@utils/api/auth";


const useAuth = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => {
        if (!state.auth.user) {
            const user = getUser();
            if (!user) {
                console.error("No user found in cookies");
                return null;
            }
            return {
                token: user.token ?? '',
                user: {
                    email: user.email ?? '',
                    pseudo: user.pseudo ?? '',
                },
                refreshToken: user.refreshToken ?? '',
            }
        }
        return state.auth.user;
    });

    const signIn = async (credentials: { email: string; password: string }) => {
        const response = await login(credentials.email, credentials.password);
        if (response.success) {
            dispatch(setUser({ token: response.token, user: response.user as User, refreshToken: response.refreshToken }));
        } else {
            console.error("Erreur de connexion :", response.message);
            throw new Error("Invalid credentials");
        }
    };

    const signUp = async (credentials: { email: string; username: string; password: string; confirmPassword: string }) => {
        const response = await register(credentials.email, credentials.username, credentials.password, credentials.confirmPassword);

        if (response.success) {
            dispatch(setUser({ token: response.token, user: response.user, refreshToken: response.refreshToken }));
        } else {
            console.error("Erreur d'inscription :", response.message);
        }
    };

    const signOut = () => {
        Cookies.remove('theGameReviewToken');
        Cookies.remove('refreshToken');
        Cookies.remove('pseudo');
        dispatch(logout());
    };

    const isAuthenticated = Boolean(user);

    return { user, isAuthenticated, signIn, signOut, signUp };
};

export default useAuth;

