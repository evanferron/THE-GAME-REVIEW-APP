import useAuth from '@hooks/useAuth';
import { authLinks } from '@constants/routes';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const getToken = () => Cookies.get('token');

export const getRefreshToken = () => Cookies.get('refreshToken');
export const getEmail = () => Cookies.get('email');
export const getPseudo = () => Cookies.get('pseudo');
export const getUser = () => ({
    email: getEmail(),
    pseudo: getPseudo(),
});


export const handleLogout = () => {
    useAuth().signOut();
    const navigate = useNavigate();
    navigate(authLinks.login.href);
};