import useAuth from '@hooks/useAuth';
import { authLinks } from '@constants/routes';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const getToken = () => Cookies.get('theGameReviewToken');
export const getRefreshToken = () => Cookies.get('refreshToken');
export const getEmail = () => Cookies.get('email');
export const getPseudo = () => Cookies.get('pseudo');
export const getProfilePictureId = () => Cookies.get('profilePictureId');
export const getUser = () => ({
    email: getEmail(),
    pseudo: getPseudo(),
    token: getToken(),
    refreshToken: getRefreshToken(),
    profilePictureId : getProfilePictureId(),
});

export const setUserCookie = (user: { token: string; refreshToken: string; email: string; pseudo: string, profilePictureId: number }) => {
    Cookies.set('theGameReviewToken', user.token);
    Cookies.set('refreshToken', user.refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('email', user.email);
    Cookies.set('pseudo', user.pseudo);
    Cookies.set('profilePictureId', user.profilePictureId.toString())
}

export const removeUserCookie = () => {
    Cookies.remove('theGameReviewToken');
    Cookies.remove('refreshToken');
    Cookies.remove('email');
    Cookies.remove('pseudo');
    Cookies.remove('profilePictureId');
}

export const setToken = (token: string) => {
    Cookies.set('theGameReviewToken', token);
}

export const handleLogout = () => {
    useAuth().signOut();
    const navigate = useNavigate();
    navigate(authLinks.login.href);
};