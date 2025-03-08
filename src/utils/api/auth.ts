import useAuth from '@hooks/useAuth';
import { authLinks } from '@constants/routes';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const getAuthToken = () => Cookies.get('tashToken');


export const handleLogout = () => {
    useAuth().signOut();
    const navigate = useNavigate();
    navigate(authLinks.login.href);
};