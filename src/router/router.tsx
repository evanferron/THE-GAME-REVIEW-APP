import Home from '@pages/Home/Home';
import Profile from '@pages/Profile/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { authLinks } from '../constants/routes';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ErrorPage from '../pages/Error/Error';
import PrivateRoute from './PrivateRoute';
import AccountSettings from '@pages/Profile/AccountSettings';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ### Routes non protégées ### */}
        <Route
          path="/"
          element={
              <Profile></Profile>
          }
        />
        <Route path={authLinks.login.href} element={<Login />} />
        <Route path={authLinks.register.href} element={<Register />} />
        {/* ### Routes protégées ### */}
        
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile></Profile>
            </PrivateRoute>
          }
        />

        <Route path="/account-settings" element={ <PrivateRoute> 
          <AccountSettings />
          </PrivateRoute> } />  

        {/* ### Routes Not Found ### */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
