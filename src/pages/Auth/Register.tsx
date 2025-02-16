import React, { useEffect, useState } from 'react';

import { register } from '@api/auth';
import { setUser } from '@store/slices/auth';
import { validateRegister } from '@utils/validation/validators/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { authLinks } from '../../constants/routes';
import { ValidatorErrorsRegister } from '../../types/errors/auth';
import styles from './Auth.module.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // ### Erreurs ### //
  const [apiError, setApiError] = useState<string | null>(null);
  const [errorsForm, setErrorsForm] = useState<ValidatorErrorsRegister | null>({
    email: null,
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  // ### Modification du titre de la page ### //
  useEffect(() => {
    document.title = 'Tash | Sign up';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // ### Vérification du formulaire ### //
    const validationErrors = validateRegister(email, username, password, confirmPassword);
    setErrorsForm(validationErrors);

    // ### Si erreur alors on abandonne ### //
    if (validationErrors != null) {
      return;
    }

    try {
      // ### Envoi des données du formulaire ### //
      const { token, user } = await register(email, username, password, confirmPassword);
      dispatch(setUser({ token, user }));
      navigate('/');
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  return (
    <main className={styles.container_auth}>
      <img src={'/assets/images/others/connexion-bg.png'} className={styles.background} />
      <div className={styles.form_wrap}>
        <div className={styles.form_container}>
          <img className={styles.logo} src="/assets/images/others/logo-black.png" alt="logo" />
          <h1>Create an Account</h1>

          <p className={styles.description}>
            Sign up now to collaborate with your team, track tasks, and achieve your goals—all in
            one place!
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errorsForm?.email ? styles.error_input : ''}
              required
            />
            {errorsForm?.email && <span className={styles.error_text}>{errorsForm.email}</span>}

            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className={errorsForm?.username ? styles.error_input : ''}
              required
            />

            {errorsForm?.username && (
              <span className={styles.error_text}>{errorsForm.username}</span>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errorsForm?.password ? styles.error_input : ''}
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errorsForm?.password ? styles.error_input : ''}
              required
            />

            {errorsForm?.password && (
              <span className={styles.error_text}>{errorsForm.password}</span>
            )}
            <button type="submit">Sign Up</button>

            {apiError && <span className={styles.error_text}>{apiError}</span>}

            <p className={styles.switch}>
              Already registered ? <Link to={authLinks.login.href}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
