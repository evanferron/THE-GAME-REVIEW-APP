import Discover from '@pages/Discover/Discover';
import Home from '@pages/Home/Home';
import AccountSettings from '@pages/Profile/AccountSettings';
import Profile from '@pages/Profile/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { authLinks } from '../constants/routes';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ErrorPage from '../pages/Error/Error';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ### Routes non protégées ### */}
        <Route path="/" element={<Home></Home>} />
        <Route path="/discovery" element={<Discover />} />

        {/* ### Routes d'authentification ### */}
        <Route path={authLinks.login.href} element={<Login />} />
        <Route path={authLinks.register.href} element={<Register />} />
        {/* ### Routes protégées ### */}

        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profile></Profile>
            </PrivateRoute>
          }
        />

        <Route
          path="/account-settings"
          element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }
        />

        {/* ### Routes Not Found ### */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
